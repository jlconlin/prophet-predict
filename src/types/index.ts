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
}
