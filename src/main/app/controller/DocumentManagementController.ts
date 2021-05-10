import config from 'config';
import type { Response } from 'express';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { Case, CaseWithId } from '../case/case';
import { PATCH_CASE } from '../case/definition';
import { Classification, DocumentManagementClient } from '../document/DocumentManagementClient';

import type { AppRequest, UserDetails } from './AppRequest';

export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.documentManagement.url'), getServiceAuthToken(), user);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const documentManagementClient = this.getDocumentManagementClient(req.session.user);

    const filesCreated = await documentManagementClient.create({
      files: req.files,
      classification: Classification.Public,
    });

    let newUploads: Case['documentsUploaded'] = [];
    if (Array.isArray(filesCreated)) {
      newUploads = filesCreated.map(file => {
        const docUrlParts = file._links.self.href.split('/');
        const id = docUrlParts[docUrlParts.length - 1];
        return {
          id,
          value: {
            documentComment: 'Uploaded by applicant',
            documentFileName: file.originalDocumentName,
            documentLink: {
              document_url: file._links.self.href,
              document_filename: file.originalDocumentName,
              document_binary_url: file._links.binary.href,
            },
          },
        };
      });
    }

    const updatedDocumentsUploaded = [...(req.session.userCase.documentsUploaded || []), ...newUploads];

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { documentsUploaded: updatedDocumentsUploaded },
      PATCH_CASE
    );

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.json(newUploads?.map(file => ({ id: file.id, name: file.value?.documentFileName })));
    });
  }

  public async delete(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const { documentsUploaded = [] } = req.session.userCase;

    const documentIndexToDelete = documentsUploaded?.findIndex(i => i.id === req.params.id) ?? -1;
    const documentToDelete = documentsUploaded[documentIndexToDelete];
    if (documentIndexToDelete === -1 || !documentToDelete.value?.documentLink?.document_url) {
      res.json({ deletedId: null });
      return;
    }

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    await documentManagementClient.delete({
      url: documentToDelete.value.documentLink.document_url,
    });

    documentsUploaded[documentIndexToDelete].value = null;

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { documentsUploaded },
      PATCH_CASE
    );

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.json({ deletedId: req.params.id });
    });
  }
}