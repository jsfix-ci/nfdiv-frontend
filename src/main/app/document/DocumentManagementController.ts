import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';
import { v4 as generateUuid } from 'uuid';

import { APPLICANT_2, PROVIDE_INFORMATION_TO_THE_COURT, UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CaseWithId } from '../case/case';
import { CITIZEN_APPLICANT2_UPDATE, CITIZEN_UPDATE, DivorceDocument, ListValue, State } from '../case/definition';
import { getFilename } from '../case/formatter/uploaded-files';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { Classification, DocumentManagementClient } from './DocumentManagementClient';

@autobind
export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.documentManagement.url'), getServiceAuthToken(), user);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const isApplicant2 = req.session.isApplicant2;
    if (
      (!isApplicant2 &&
        ![State.Draft, State.AwaitingApplicant1Response, State.AwaitingClarification].includes(
          req.session.userCase.state
        )) ||
      (isApplicant2 &&
        ![State.AwaitingApplicant2Response, State.AwaitingClarification].includes(req.session.userCase.state))
    ) {
      throw new Error('Cannot upload new documents as case is not in the correct state');
    }

    if (!req.files?.length) {
      if (req.headers.accept?.includes('application/json')) {
        throw new Error('No files were uploaded');
      } else if (req.session.userCase.state === State.AwaitingClarification) {
        return res.redirect(
          isApplicant2 ? `${APPLICANT_2}${PROVIDE_INFORMATION_TO_THE_COURT}` : PROVIDE_INFORMATION_TO_THE_COURT
        );
      } else {
        return res.redirect(isApplicant2 ? `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}` : UPLOAD_YOUR_DOCUMENTS);
      }
    }

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);

    const filesCreated = await documentManagementClient.create({
      files: req.files,
      classification: Classification.Public,
    });

    const newUploads: ListValue<Partial<DivorceDocument> | null>[] = filesCreated.map(file => ({
      id: generateUuid(),
      value: {
        documentComment: 'Uploaded by applicant',
        documentFileName: file.originalDocumentName,
        documentLink: {
          document_url: file._links.self.href,
          document_filename: file.originalDocumentName,
          document_binary_url: file._links.binary.href,
        },
      },
    }));

    const documentsKey =
      req.session.userCase.state === State.AwaitingClarification
        ? 'coClarificationUploadDocuments'
        : isApplicant2
        ? 'applicant2DocumentsUploaded'
        : 'applicant1DocumentsUploaded';
    const updatedDocumentsUploaded = newUploads.concat(req.session.userCase[documentsKey] || []);

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { [documentsKey]: updatedDocumentsUploaded },
      isApplicant2 ? CITIZEN_APPLICANT2_UPDATE : CITIZEN_UPDATE
    );

    req.session.save(() => {
      if (req.headers.accept?.includes('application/json')) {
        res.json(newUploads.map(file => ({ id: file.id, name: getFilename(file.value) })));
      } else if (req.session.userCase.state === State.AwaitingClarification) {
        return res.redirect(
          isApplicant2 ? `${APPLICANT_2}${PROVIDE_INFORMATION_TO_THE_COURT}` : PROVIDE_INFORMATION_TO_THE_COURT
        );
      } else {
        res.redirect(isApplicant2 ? `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}` : UPLOAD_YOUR_DOCUMENTS);
      }
    });
  }

  public async delete(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const isApplicant2 = req.session.isApplicant2;
    const documentsUploadedKey =
      req.session.userCase.state === State.AwaitingClarification
        ? 'coClarificationUploadDocuments'
        : isApplicant2
        ? 'applicant2DocumentsUploaded'
        : 'applicant1DocumentsUploaded';
    const documentsUploaded =
      (req.session.userCase[documentsUploadedKey] as ListValue<Partial<DivorceDocument> | null>[]) ?? [];

    if (
      (!isApplicant2 &&
        ![State.Draft, State.AwaitingApplicant1Response, State.AwaitingClarification].includes(
          req.session.userCase.state
        )) ||
      (isApplicant2 &&
        ![State.AwaitingApplicant2Response, State.AwaitingClarification].includes(req.session.userCase.state))
    ) {
      throw new Error('Cannot delete documents as case is not in the correct state');
    }

    const documentIndexToDelete = parseInt(req.params.index, 10);
    const documentToDelete = documentsUploaded[documentIndexToDelete];
    if (!documentToDelete?.value?.documentLink?.document_url) {
      if (req.session.userCase.state === State.AwaitingClarification) {
        return res.redirect(
          isApplicant2 ? `${APPLICANT_2}${PROVIDE_INFORMATION_TO_THE_COURT}` : PROVIDE_INFORMATION_TO_THE_COURT
        );
      }
      return res.redirect(isApplicant2 ? `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}` : UPLOAD_YOUR_DOCUMENTS);
    }
    const documentUrlToDelete = documentToDelete.value.documentLink.document_url;

    documentsUploaded[documentIndexToDelete].value = null;

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { [documentsUploadedKey]: documentsUploaded },
      isApplicant2 ? CITIZEN_APPLICANT2_UPDATE : CITIZEN_UPDATE
    );

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    await documentManagementClient.delete({ url: documentUrlToDelete });

    req.session.save(err => {
      if (err) {
        throw err;
      }
      if (req.session.userCase.state === State.AwaitingClarification) {
        return res.redirect(
          isApplicant2 ? `${APPLICANT_2}${PROVIDE_INFORMATION_TO_THE_COURT}` : PROVIDE_INFORMATION_TO_THE_COURT
        );
      }
      return res.redirect(isApplicant2 ? `${APPLICANT_2}${UPLOAD_YOUR_DOCUMENTS}` : UPLOAD_YOUR_DOCUMENTS);
    });
  }
}
