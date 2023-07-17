import {
  ProphetPredictionType,
  CandidateRawType,
  CandidateType,
  ActuarialLifeTableType,
} from '@/types/index';
import {Candidate} from './Candidate';
import {ActuarialLifeTable} from './ActuarialLifeTable';
import candidatesRawData from '@/data/candidatesRaw.json';
const candidatesRaw = candidatesRawData as CandidateRawType[];

export class ProphetPrediction implements ProphetPredictionType {
  candidates: CandidateType[];
  actuarialLifeTable: ActuarialLifeTableType;

  constructor() {
    this.candidates = [];
    this.actuarialLifeTable = new ActuarialLifeTable();
    this.loadRawCandidateData();
    this.calculateSeniorApostles();
    this.loadCandidatesActuarialTableValues();
    this.calculateCandidatesGranularLifeExpectancy();
  }

  loadRawCandidateData(): void {
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

  loadCandidatesActuarialTableValues(): void {
    this.candidates.forEach((candidate: CandidateType) => {
      candidate.loadActuarialTableValues(this.actuarialLifeTable.dailyRates);
    });
  }

  calculateCandidatesGranularLifeExpectancy(): void {
    this.candidates.forEach((candidate: CandidateType) => {
      candidate.calculateDailyLifeExpectancies(
        this.actuarialLifeTable.dailyRates
      );
    });
  }
}
