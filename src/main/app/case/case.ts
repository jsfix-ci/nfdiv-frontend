import { AnyObject } from '../controller/PostController';

import { DivorceOrDissolution, Gender, JurisdictionConnections } from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, string>> = {
  divorceOrDissolution: 'divorceOrDissolution',
  gender: 'D8InferredRespondentGender',
  screenHasUnionBroken: 'D8ScreenHasMarriageBroken',
  hasCertificate: 'D8ScreenHasMarriageCert',
  helpPayingNeeded: 'D8HelpWithFeesNeedHelp',
  alreadyAppliedForHelpPaying: 'D8HelpWithFeesAppliedForFees',
  helpWithFeesRefNo: 'D8HelpWithFeesReferenceNumber',
  inTheUk: 'D8MarriedInUk',
  certificateInEnglish: 'D8CertificateInEnglish',
  certifiedTranslation: 'D8CertifiedTranslation',
  ceremonyCountry: 'D8CountryName',
  ceremonyPlace: 'D8MarriagePlaceOfMarriage',
  yourLifeBasedInEnglandAndWales: 'JurisdictionPetitionerResidence',
  partnersLifeBasedInEnglandAndWales: 'JurisdictionRespondentResidence',
  yourDomicileInEnglandWales: 'JurisdictionPetitionerDomicile',
  partnersDomicileInEnglandWales: 'JurisdictionRespondentDomicile',
  lastHabituallyResident: 'JurisdictionBothLastHabituallyResident',
  livingInEnglandWalesTwelveMonths: 'JurisdictionPetHabituallyResLastTwelveMonths',
  livingInEnglandWalesSixMonths: 'JurisdictionPetHabituallyResLastSixMonths',
  phoneNumber: 'D8PetitionerPhoneNumber',
  jurisdictionResidualEligible: 'JurisdictionResidualEligible',
  connections: 'JurisdictionConnections',
};

export function formatCase<InputFormat, OutputFormat>(fields: FieldFormats, data: InputFormat): OutputFormat {
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
  divorceOrDissolution: DivorceOrDissolution;
  gender?: Gender;
  sameSex?: Checkbox;
  screenHasUnionBroken?: YesOrNo;
  relationshipDate?: CaseDate;
  hasCertificate?: YesOrNo;
  helpPayingNeeded?: YesOrNo;
  alreadyAppliedForHelpPaying?: YesOrNo;
  helpWithFeesRefNo?: string;
  inTheUk?: YesOrNo;
  certificateInEnglish?: YesOrNo;
  certifiedTranslation?: YesOrNo;
  ceremonyCountry?: string;
  ceremonyPlace?: string;
  yourLifeBasedInEnglandAndWales?: YesOrNo;
  partnersLifeBasedInEnglandAndWales?: YesOrNo;
  yourDomicileInEnglandWales?: YesOrNo;
  partnersDomicileInEnglandWales?: YesOrNo;
  lastHabituallyResident?: YesOrNo;
  livingInEnglandWalesTwelveMonths?: YesOrNo;
  livingInEnglandWalesSixMonths?: YesOrNo;
  jurisdictionResidualEligible?: YesOrNo;
  englishOrWelsh?: LanguagePreference;
  phoneNumber?: string;
  agreeToReceiveEmails?: Checkbox;
  connections: JurisdictionConnections[];
}

export interface CaseWithId extends Case {
  id: string;
}

export enum YesOrNo {
  Yes = 'YES',
  No = 'NO',
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
