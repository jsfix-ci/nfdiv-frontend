import { AnyObject } from '../controller/PostController';

import {
  AlternativeServiceOutcome,
  Applicant2Represented,
  ApplicationType,
  CaseData,
  ChangedNameHow,
  ClarificationReason,
  ConditionalOrderCourt,
  DateAsString,
  DivorceDocument,
  DivorceOrDissolution,
  DocumentType,
  FinancialOrderFor,
  Gender,
  JurisdictionConnections,
  LegalAdvisorDecision,
  ListValue,
  OrderSummary,
  Payment,
  State,
  YesOrNo,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  applicationType: 'applicationType',
  divorceOrDissolution: 'divorceOrDissolution',
  gender: 'applicant2Gender',
  applicant1ScreenHasUnionBroken: 'applicant1ScreenHasMarriageBroken',
  applicant2ScreenHasUnionBroken: 'applicant2ScreenHasMarriageBroken',
  hasCertificate: 'screenHasMarriageCert',
  applicant1HelpPayingNeeded: 'applicant1HWFNeedHelp',
  applicant1AlreadyAppliedForHelpPaying: 'applicant1HWFAppliedForFees',
  applicant1HelpWithFeesRefNo: 'applicant1HWFReferenceNumber',
  applicant2HelpPayingNeeded: 'applicant2HWFNeedHelp',
  applicant2AlreadyAppliedForHelpPaying: 'applicant2HWFAppliedForFees',
  applicant2HelpWithFeesRefNo: 'applicant2HWFReferenceNumber',
  inTheUk: 'marriageMarriedInUk',
  certificateInEnglish: 'marriageCertificateInEnglish',
  certifiedTranslation: 'marriageCertifiedTranslation',
  ceremonyCountry: 'marriageCountryOfMarriage',
  ceremonyPlace: 'marriagePlaceOfMarriage',
  applicant1LifeBasedInEnglandAndWales: 'jurisdictionApplicant1Residence',
  applicant2LifeBasedInEnglandAndWales: 'jurisdictionApplicant2Residence',
  applicant1DomicileInEnglandWales: 'jurisdictionApplicant1Domicile',
  applicant2DomicileInEnglandWales: 'jurisdictionApplicant2Domicile',
  bothLastHabituallyResident: 'jurisdictionBothLastHabituallyResident',
  applicant1LivingInEnglandWalesTwelveMonths: 'jurisdictionApp1HabituallyResLastTwelveMonths',
  applicant1LivingInEnglandWalesSixMonths: 'jurisdictionApp1HabituallyResLastSixMonths',
  connections: 'jurisdictionConnections',
  jurisdictionResidualEligible: 'jurisdictionResidualEligible',
  applicant1PhoneNumber: 'applicant1PhoneNumber',
  applicant1FirstNames: 'applicant1FirstName',
  applicant1MiddleNames: 'applicant1MiddleName',
  applicant1LastNames: 'applicant1LastName',
  applicant2FirstNames: 'applicant2FirstName',
  applicant2MiddleNames: 'applicant2MiddleName',
  applicant2LastNames: 'applicant2LastName',
  applicant1FullNameOnCertificate: 'marriageApplicant1Name',
  applicant2FullNameOnCertificate: 'marriageApplicant2Name',
  applicant1ConfirmReceipt: 'applicant1ConfirmReceipt',
  applicant2ConfirmReceipt: 'applicant2ConfirmReceipt',
  applicant1LastNameChangedWhenRelationshipFormed: 'applicant1LastNameChangedWhenMarried',
  applicant2LastNameChangedWhenRelationshipFormed: 'applicant2LastNameChangedWhenMarried',
  applicant1NameChangedSinceRelationshipFormed: 'applicant1NameDifferentToMarriageCertificate',
  applicant2NameChangedSinceRelationshipFormed: 'applicant2NameDifferentToMarriageCertificate',
  applicant1NameChangedHow: 'applicant1NameChangedHow',
  applicant1ChangedNameHowAnotherWay: 'applicant1NameChangedHowOtherDetails',
  applicant2NameChangedHow: 'applicant2NameChangedHow',
  applicant2ChangedNameHowAnotherWay: 'applicant2NameChangedHowOtherDetails',
  applicant1Email: 'applicant1Email',
  applicant2Email: 'applicant2Email',
  applicant2EmailAddress: 'applicant2InviteEmailAddress',
  applicant2PhoneNumber: 'applicant2PhoneNumber',
  applicant1KnowsApplicant2Address: 'applicant1KnowsApplicant2Address',
  applicant1LegalProceedings: 'applicant1LegalProceedings',
  applicant1LegalProceedingsDetails: 'applicant1LegalProceedingsDetails',
  applicant2LegalProceedings: 'applicant2LegalProceedings',
  applicant2LegalProceedingsDetails: 'applicant2LegalProceedingsDetails',
  applicant1ApplyForFinancialOrder: 'applicant1FinancialOrder',
  applicant1WhoIsFinancialOrderFor: 'applicant1FinancialOrdersFor',
  applicant2ApplyForFinancialOrder: 'applicant2FinancialOrder',
  applicant2WhoIsFinancialOrderFor: 'applicant2FinancialOrdersFor',
  applicant1DocumentsUploaded: 'applicant1DocumentsUploaded',
  applicant2DocumentsUploaded: 'applicant2DocumentsUploaded',
  documentsGenerated: 'documentsGenerated',
  documentsUploaded: 'documentsUploaded',
  respondentUserId: 'applicant2UserId',
  applicant2Confirmation: 'applicant2ConfirmApplicant1Information',
  applicant2Explanation: 'applicant2ExplainsApplicant1IncorrectInformation',
  applicant1PcqId: 'applicant1PcqId',
  issueDate: 'issueDate',
  applicant1SolicitorAddress: 'applicant1SolicitorAddress',
  accessCode: 'accessCode',
  applicationFeeOrderSummary: 'applicationFeeOrderSummary',
  payments: 'applicationPayments',
  confirmDisputeApplication: 'confirmDisputeApplication',
  jurisdictionAgree: 'jurisdictionAgree',
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: 'reasonCourtsOfEnglandAndWalesHaveNoJurisdiction',
  inWhichCountryIsYourLifeMainlyBased: 'inWhichCountryIsYourLifeMainlyBased',
  alternativeServiceOutcomes: 'alternativeServiceOutcomes',
  applicant1ApplyForConditionalOrderStarted: 'coApplicant1ApplyForConditionalOrderStarted',
  applicant2ApplyForConditionalOrderStarted: 'coApplicant2ApplyForConditionalOrderStarted',
  applicant1ApplyForConditionalOrder: 'coApplicant1ApplyForConditionalOrder',
  applicant2ApplyForConditionalOrder: 'coApplicant2ApplyForConditionalOrder',
  applicant1ConfirmInformationStillCorrect: 'coApplicant1ConfirmInformationStillCorrect',
  applicant1ReasonInformationNotCorrect: 'coApplicant1ReasonInformationNotCorrect',
  applicant2ConfirmInformationStillCorrect: 'coApplicant2ConfirmInformationStillCorrect',
  applicant2ReasonInformationNotCorrect: 'coApplicant2ReasonInformationNotCorrect',
  coCourt: 'coCourt',
  coCertificateOfEntitlementDocument: 'coCertificateOfEntitlementDocument',
  coConditionalOrderGrantedDocument: 'coConditionalOrderGrantedDocument',
  coDateAndTimeOfHearing: 'coDateAndTimeOfHearing',
  coDecisionDate: 'coDecisionDate',
  applicant1IsApplicant2Represented: 'applicant1IsApplicant2Represented',
  coRefusalClarificationReason: 'coRefusalClarificationReason',
  coRefusalClarificationAdditionalInfo: 'coRefusalClarificationAdditionalInfo',
  coClarificationUploadDocuments: 'coClarificationUploadDocuments',
  coLegalAdvisorDecisions: 'coLegalAdvisorDecisions',
  dateFinalOrderEligibleToRespondent: 'dateFinalOrderEligibleToRespondent',
  dateFinalOrderNoLongerEligible: 'dateFinalOrderNoLongerEligible',
  applicant2SolicitorName: 'applicant2SolicitorName',
  applicant2SolicitorEmail: 'applicant2SolicitorEmail',
  applicant2SolicitorFirmName: 'applicant2SolicitorFirmName',
  applicant1FinalOrderLateExplanation: 'applicant1FinalOrderLateExplanation',
  applicant2FinalOrderExplanation: 'applicant2FinalOrderExplanation',
  applicant1CannotUpload: 'applicant1CannotUpload',
  applicant2CannotUpload: 'applicant2CannotUpload',
  applicant2SolicitorRepresented: 'applicant2SolicitorRepresented',
  applicant1UsedWelshTranslationOnSubmission: 'applicant1UsedWelshTranslationOnSubmission',
  applicant2UsedWelshTranslationOnSubmission: 'applicant2UsedWelshTranslationOnSubmission',
  coRefusalRejectionAdditionalInfo: 'coRefusalRejectionAdditionalInfo',
  dueDate: 'dueDate',
  dateSubmitted: 'dateSubmitted',
  dateAosSubmitted: 'dateAosSubmitted',
  dateFinalOrderSubmitted: 'dateFinalOrderSubmitted',
  coApplicant1SubmittedDate: 'coApplicant1SubmittedDate',
  coApplicant2SubmittedDate: 'coApplicant2SubmittedDate',
  dateFinalOrderEligibleFrom: 'dateFinalOrderEligibleFrom',
  applicant1AppliedForFinalOrderFirst: 'applicant1AppliedForFinalOrderFirst',
  applicant2AppliedForFinalOrderFirst: 'applicant2AppliedForFinalOrderFirst',
  doesApplicant1IntendToSwitchToSole: 'doesApplicant1IntendToSwitchToSole',
  dateApplicant1DeclaredIntentionToSwitchToSoleFo: 'dateApplicant1DeclaredIntentionToSwitchToSoleFo',
  doesApplicant2IntendToSwitchToSole: 'doesApplicant2IntendToSwitchToSole',
  dateApplicant2DeclaredIntentionToSwitchToSoleFo: 'dateApplicant2DeclaredIntentionToSwitchToSoleFo',
  finalOrderSwitchedToSole: 'finalOrderSwitchedToSole',
};

export function formatCase<OutputFormat>(fields: FieldFormats, data: Partial<Case> | CaseData): OutputFormat {
  const result = {};

  for (const field of Object.keys(data)) {
    const value = fields[field];

    if (typeof value === 'function') {
      Object.assign(result, value(data));
    } else if (typeof fields[field] === 'string') {
      result[value] = data[field];
    }
  }

  return result as OutputFormat;
}

export type FieldFormats = Record<string, string | ((AnyObject) => AnyObject)>;

export interface Case {
  applicationType?: ApplicationType;
  divorceOrDissolution: DivorceOrDissolution;
  issueDate?: DateAsString;
  applicant1SolicitorAddress?: string;
  applicant2SolicitorAddress?: string;
  gender?: Gender;
  sameSex?: Checkbox;
  applicant1ScreenHasUnionBroken?: YesOrNo;
  applicant2ScreenHasUnionBroken?: YesOrNo;
  relationshipDate?: CaseDate;
  hasCertificate?: YesOrNo;
  applicant1HelpPayingNeeded?: YesOrNo;
  applicant1AlreadyAppliedForHelpPaying?: YesOrNo;
  applicant1HelpWithFeesRefNo?: string;
  applicant2HelpPayingNeeded?: YesOrNo;
  applicant2AlreadyAppliedForHelpPaying?: YesOrNo;
  applicant2HelpWithFeesRefNo?: string;
  inTheUk?: YesOrNo;
  certificateInEnglish?: YesOrNo;
  certifiedTranslation?: YesOrNo;
  ceremonyCountry?: string;
  ceremonyPlace?: string;
  applicant1LifeBasedInEnglandAndWales?: YesOrNo;
  applicant2LifeBasedInEnglandAndWales?: YesOrNo;
  applicant1DomicileInEnglandWales?: YesOrNo;
  applicant2DomicileInEnglandWales?: YesOrNo;
  bothLastHabituallyResident?: YesOrNo;
  applicant1LivingInEnglandWalesTwelveMonths?: YesOrNo;
  applicant1LivingInEnglandWalesSixMonths?: YesOrNo;
  jurisdictionResidualEligible?: YesOrNo;
  applicant1EnglishOrWelsh?: LanguagePreference;
  applicant2EnglishOrWelsh?: LanguagePreference;
  applicant1FirstNames?: string;
  applicant1MiddleNames?: string;
  applicant1LastNames?: string;
  applicant1Address1?: string;
  applicant1Address2?: string;
  applicant1Address3?: string;
  applicant1AddressTown?: string;
  applicant1AddressCounty?: string;
  applicant1AddressPostcode?: string;
  applicant1AddressCountry?: string;
  applicant1PhoneNumber?: string;
  applicant1AgreeToReceiveEmails?: Checkbox;
  applicant1ConfirmReceipt: YesOrNo;
  applicant2PhoneNumber?: string;
  applicant2AgreeToReceiveEmails?: Checkbox;
  applicant2ConfirmReceipt: YesOrNo;
  applicant1ApplyForConditionalOrderStarted: YesOrNo;
  applicant2ApplyForConditionalOrderStarted: YesOrNo;
  connections: JurisdictionConnections[];
  applicant1FullNameOnCertificate?: string;
  applicant2FullNameOnCertificate?: string;
  applicant1AddressPrivate: YesOrNo;
  applicant2FirstNames?: string;
  applicant2MiddleNames?: string;
  applicant2LastNames?: string;
  applicant2AddressPrivate: YesOrNo;
  applicant2Address1?: string;
  applicant2Address2?: string;
  applicant2Address3?: string;
  applicant2AddressTown?: string;
  applicant2AddressCounty?: string;
  applicant2AddressPostcode?: string;
  applicant2AddressCountry?: string;
  applicant1LastNameChangedWhenRelationshipFormed?: YesOrNo;
  applicant2LastNameChangedWhenRelationshipFormed?: YesOrNo;
  applicant1NameChangedSinceRelationshipFormed?: YesOrNo;
  applicant2NameChangedSinceRelationshipFormed?: YesOrNo;
  applicant1NameChangedHow?: ChangedNameHow[];
  applicant2NameChangedHow?: ChangedNameHow[];
  applicant1ChangedNameHowAnotherWay?: string;
  applicant2ChangedNameHowAnotherWay?: string;
  applicant1Email?: string;
  applicant2Email?: string;
  applicant2EmailAddress?: string;
  applicant1DoesNotKnowApplicant2EmailAddress?: Checkbox;
  applicant1KnowsApplicant2Address?: YesOrNo;
  iWantToHavePapersServedAnotherWay?: Checkbox;
  applicant1LegalProceedings?: YesOrNo;
  applicant1LegalProceedingsDetails?: string;
  applicant2LegalProceedings?: YesOrNo;
  applicant2LegalProceedingsDetails?: string;
  applicant1ApplyForFinancialOrder?: YesOrNo;
  applicant1WhoIsFinancialOrderFor?: FinancialOrderFor[];
  applicant2ApplyForFinancialOrder?: YesOrNo;
  applicant2WhoIsFinancialOrderFor?: FinancialOrderFor[];
  applicant1UploadedFiles?: UploadedFile[];
  applicant2UploadedFiles?: UploadedFile[];
  documentsGenerated: ListValue<DivorceDocument>[];
  documentsUploaded: ListValue<DivorceDocument>[];
  applicant1DocumentsUploaded?: ListValue<Partial<DivorceDocument> | null>[];
  applicant2DocumentsUploaded?: ListValue<Partial<DivorceDocument> | null>[];
  applicant1CannotUpload?: Checkbox;
  applicant2CannotUpload?: Checkbox;
  applicant1CannotUploadDocuments?: DocumentType | DocumentType[];
  applicant2CannotUploadDocuments?: DocumentType | DocumentType[];
  accessCode?: string;
  dueDate?: DateAsString;
  applicant1IConfirmPrayer?: Checkbox;
  applicant2IConfirmPrayer?: Checkbox;
  applicant1StatementOfTruth?: Checkbox;
  applicant2StatementOfTruth?: Checkbox;
  caseReference?: string;
  respondentUserId?: string;
  dateSubmitted?: DateAsString;
  payments: ListValue<Payment>[];
  applicationFeeOrderSummary: OrderSummary;
  applicant2Confirmation: YesOrNo;
  applicant2Explanation: string;
  applicant1PcqId?: string;
  disputeApplication?: YesOrNo;
  confirmDisputeApplication?: YesOrNo;
  confirmReadPetition?: Checkbox;
  jurisdictionAgree?: YesOrNo;
  reasonCourtsOfEnglandAndWalesHaveNoJurisdiction?: string;
  inWhichCountryIsYourLifeMainlyBased?: string;
  alternativeServiceOutcomes: ListValue<AlternativeServiceOutcome>[];
  applicant1ApplyForConditionalOrder?: YesOrNo;
  applicant2ApplyForConditionalOrder?: YesOrNo;
  applicant1ConfirmInformationStillCorrect?: YesOrNo;
  applicant1ReasonInformationNotCorrect?: string;
  applicant2ConfirmInformationStillCorrect?: YesOrNo;
  applicant2ReasonInformationNotCorrect?: string;
  coApplicant1StatementOfTruth?: Checkbox;
  coApplicant2StatementOfTruth?: Checkbox;
  coCourt: ConditionalOrderCourt;
  dateFinalOrderEligibleFrom: DateAsString;
  coCertificateOfEntitlementDocument: DivorceDocument;
  coConditionalOrderGrantedDocument: DivorceDocument;
  coApplicant1SubmittedDate?: DateAsString;
  coApplicant2SubmittedDate?: DateAsString;
  coRefusalRejectionAdditionalInfo?: string;
  coDateAndTimeOfHearing: DateAsString;
  coDecisionDate: DateAsString;
  applicant1IsApplicant2Represented: Applicant2Represented;
  coRefusalClarificationReason?: ClarificationReason[];
  coRefusalClarificationAdditionalInfo?: string;
  dateFinalOrderEligibleToRespondent?: DateAsString;
  coClarificationResponses?: string;
  coCannotUploadClarificationDocuments?: Checkbox;
  coClarificationUploadDocuments?: ListValue<Partial<DivorceDocument> | null>[];
  coClarificationUploadedFiles?: UploadedFile[];
  coLegalAdvisorDecisions?: ListValue<LegalAdvisorDecision>[];
  doesApplicant1WantToApplyForFinalOrder?: Checkbox;
  doesApplicant2WantToApplyForFinalOrder?: Checkbox;
  applicant2FinalOrderExplanation?: string;
  dateFinalOrderNoLongerEligible?: DateAsString;
  applicant2SolicitorName: string;
  applicant2SolicitorEmail: string;
  applicant2SolicitorFirmName: string;
  applicant2SolicitorAddress1?: string;
  applicant2SolicitorAddress2?: string;
  applicant2SolicitorAddress3?: string;
  applicant2SolicitorAddressTown?: string;
  applicant2SolicitorAddressCounty?: string;
  applicant2SolicitorAddressPostcode?: string;
  applicant2SolicitorAddressCountry?: string;
  applicant1FinalOrderLateExplanation?: string;
  applicant1FinalOrderStatementOfTruth?: Checkbox;
  applicant2SolicitorRepresented: YesOrNo;
  applicant1SolicitorRepresented: YesOrNo;
  dateFinalOrderSubmitted?: DateAsString;
  applicant1IntendsToSwitchToSole?: Checkbox;
  applicant2IntendsToSwitchToSole?: Checkbox;
  dateAosSubmitted?: DateAsString;
  aosStatementOfTruth: Checkbox;
  previousState: State;
  applicant1UsedWelshTranslationOnSubmission?: YesOrNo;
  applicant2UsedWelshTranslationOnSubmission?: YesOrNo;
  applicant2Offline: YesOrNo;
  applicant1AppliedForFinalOrderFirst: YesOrNo;
  applicant2AppliedForFinalOrderFirst: YesOrNo;
  switchedToSoleCo: YesOrNo;
  coIsAdminClarificationSubmitted: YesOrNo;
  doesApplicant1IntendToSwitchToSole: YesOrNo;
  dateApplicant1DeclaredIntentionToSwitchToSoleFo: DateAsString;
  doesApplicant2IntendToSwitchToSole: YesOrNo;
  dateApplicant2DeclaredIntentionToSwitchToSoleFo: DateAsString;
  finalOrderSwitchedToSole: YesOrNo;
}

export interface CaseWithId extends Case {
  id: string;
  state: State;
}

export enum Checkbox {
  Checked = 'checked',
  Unchecked = '',
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export enum LanguagePreference {
  English = 'english',
  Welsh = 'welsh',
}

export interface UploadedFile {
  id: string;
  name: string;
}
