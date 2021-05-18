import { Checkbox } from '../../main/app/case/case';
import { ApplicationType, DivorceOrDissolution, Gender, YesOrNo } from '../../main/app/case/definition';

import { iSetTheUsersCaseTo } from './common';

Given("I've completed all questions correctly to get to the jurisdiction section", () => {
  iSetTheUsersCaseTo({
    applicationType: ApplicationType.SOLE_APPLICATION,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    gender: Gender.MALE,
    hasCertificate: YesOrNo.YES,
    helpPayingNeeded: YesOrNo.NO,
    inTheUk: YesOrNo.YES,
    'relationshipDate-day': 31,
    'relationshipDate-month': 12,
    'relationshipDate-year': 1999,
    sameSex: Checkbox.Unchecked,
    screenHasUnionBroken: YesOrNo.YES,
    yourFirstNames: 'Functional',
    yourLastNames: 'Tests',
    yourLifeBasedInEnglandAndWales: YesOrNo.YES,
    applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
  });
});
