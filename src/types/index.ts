export interface ProphetPredictionType {
  candidates: CandidateType[];
  actuarialLifeTable: ActuarialLifeTableType;
}

export interface CandidateType {
  id: string;
  name: string;
  birthDate: Date;
  ageYears: number;
  ageDays: number;
  ordinationDate: Date;
  seniorApostles: string[];
  dailyLifeExpectancies: DailyLifeExpectanciesType;
  calculateDailyLifeExpectancies: (actuarialLifeTable: DailyRates) => void;
}

export interface DailyRates {
  [key: number]: DailyRate;
}

export interface DailyRate {
  deathProbability: number;
  lifeExpectancy: number;
}

export interface DailyLifeExpectanciesType {
  [key: string]: DailyLifeExpectancy;
}

export interface DailyLifeExpectancy {
  probabilityLiving: number;
  probabilityDead: number;
}
export interface CandidateRawType {
  name: string;
  dob: string;
  ordinationDate: string;
}

export interface ActuarialLifeTableAgeType {
  deathProbability: number;
  lifeExpectancy: number;
}
export interface ActuarialLifeTableRawType {
  [key: number]: ActuarialLifeTableAgeType;
}

export interface ActuarialLifeTableType {
  raw: ActuarialLifeTableRawType;
  dailyRates: DailyRates;
}
