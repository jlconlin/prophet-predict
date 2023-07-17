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
    this.calculateCandidatesGranularLifeExpectancy();
    this.calculateCandidatesProphetProbability();
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
    for (let i = 1; i < 118 * 365 - candidate.ageDays; i++) {
      const probabilitySeniorApostlesDead: number =
        this.calculateProbabilitySeniorApostlesDead(
          candidate.seniorApostles,
          i
        );
      const probabilityProphet =
        probabilitySeniorApostlesDead *
        candidate.dailyLifeExpectancies[i].probabilityLiving;
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
