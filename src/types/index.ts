export interface ProphetPredictionDate {
  date: Date;
  probabilityLiving: number;
  probabilityDead: number;
  probabilityProphet: number;
}

export interface CandidateType {
  name: string;
  dob: Date;
  callDate: Date;
  seniorApostles: number[];
  dates: ProphetPredictionDate[];
}

export interface ProphetPredictionType {
  candidates: CandidateType[];
}
