export interface ProphetPredictionDate {
  date: Date;
  probabilityLiving: number;
  probabilityDead: number;
  probabilityProphet: number;
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
  dates: ProphetPredictionDate[];
  id: string;
}

export interface ProphetPredictionType {
  candidates: CandidateType[];
  actuarialLifeTable: ActuarialLifeTableType;
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
