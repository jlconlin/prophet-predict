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
    this.loadRawData();
    this.calculateSeniorApostles();
  }

  loadRawData(): void {
    candidatesRaw.forEach((candidate: CandidateRawType) => {
      this.candidates.push(new Candidate(candidate));
    });
  }

  calculateSeniorApostles(): void {
    this.candidates.forEach((candidate: CandidateType) => {
      this.candidates.forEach((otherCandidate: CandidateType) => {
        if (candidate.id === otherCandidate.id) return;
        if (candidate.ordinationDate > otherCandidate.ordinationDate) {
          candidate.seniorApostles.push(otherCandidate.id);
        }
      });
    });
  }
}
