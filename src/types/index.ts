export interface ProphetPredictionType {
  candidates: CandidateType[];
  actuarialLifeTable: ActuarialLifeTableType;
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

export interface CandidateType {
  name: string;
  dob: Date;
  ordinationDate: Date;
  seniorApostles: string[];
  id: string;
  daysSinceBirth: number;
  actuarialTable: DailyRate;
  dailyLifeExpectancies: DailyLifeExpectanciesType;
  ageYears: number;
  loadActuarialTableValues: (actuarialLifeTable: DailyRates) => void;
  calculateDailyLifeExpectancies: (actuarialLifeTable: DailyRates) => void;
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

export interface DailyRate {
  deathProbability: number;
  lifeExpectancy: number;
}

export interface DailyRates {
  [key: number]: DailyRate;
}
