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
    this.sortCandidatesByOrdinationDate();
    this.calculateSeniorApostles();
    this.calculateCandidatesGranularLifeExpectancy();
    this.calculateCandidatesProphetProbability();
  }

  loadRawCandidateData(): void {
    candidatesRaw.forEach((candidate: CandidateRawType) => {
      this.candidates.push(new Candidate(candidate));
    });
  }

  sortCandidatesByOrdinationDate(): void {
    this.candidates.sort((a: CandidateType, b: CandidateType) => {
      return b.ordinationDate.getTime() - a.ordinationDate.getTime();
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

  calculateCandidatesGranularLifeExpectancy(): void {
    this.candidates.forEach((candidate: CandidateType) => {
      candidate.calculateDailyLifeExpectancies(
        this.actuarialLifeTable.dailyRates
      );
    });
  }

  calculateCandidatesProphetProbability(): void {
    this.candidates.forEach((candidate: CandidateType) => {
      this.calculateProphetProbability(candidate);
    });
  }

  calculateProphetProbability(candidate: CandidateType): void {
    let daysToCalculate: number = 50 * 365;
    for (let i = 1; i < daysToCalculate; i++) {
      const probabilitySeniorApostlesDead: number =
        this.calculateProbabilitySeniorApostlesDead(
          candidate.seniorApostles,
          i
        );
      const probabilityProphet =
        probabilitySeniorApostlesDead *
          candidate.dailyLifeExpectancies[i]?.probabilityLiving || 0;
      candidate.dailyProphetProbabilities[i] = {
        probabilityProphet,
      };
    }
  }

  calculateProbabilitySeniorApostlesDead(
    seniorApostles: string[],
    day: number
  ): number {
    let deadProbabilities: number[] = [];
    seniorApostles.forEach((seniorApostleId: string) => {
      const seniorApostle = this.candidates.find((candidate: CandidateType) => {
        return candidate.id === seniorApostleId;
      });
      const probabilityDead =
        seniorApostle?.dailyLifeExpectancies[day]?.probabilityDead || 1;
      deadProbabilities.push(probabilityDead);
    });
    const result = deadProbabilities.reduce((a, b) => a * b, 1);
    return result;
  }
}
