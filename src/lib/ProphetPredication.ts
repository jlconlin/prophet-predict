import {
  ProphetPredictionType,
  CandidateRawType,
  CandidateType,
} from '@/types/index';
import {Candidate} from './Candidate';
import candidatesRawData from '@/data/candidatesRaw.json';
const candidatesRaw = candidatesRawData as CandidateRawType[];

export class ProphetPrediction implements ProphetPredictionType {
  candidates: CandidateType[];

  constructor() {
    this.candidates = [];
    this.calculate();
  }

  calculate(): void {
    candidatesRaw.forEach((candidate: CandidateRawType) => {
      this.candidates.push(new Candidate(candidate));
    });
  }
}
