import {
  ProphetPredictionType,
  CandidateRawType,
  CandidateType,
  ActuarialLifeTableType,
  graphDataType,
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
      return a.ordinationDate.getTime() - b.ordinationDate.getTime();
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

  returnGraphData(): graphDataType[] {
    const graphData: graphDataType[] = [];
    const today: Date = new Date();
    for (const candidate of this.candidates) {
      const data: {x: string; y: number; age: number}[] = [];
      const daysToRender = 30 * 365;
      for (let i = 1; i < daysToRender; i++) {
        if (!(i === 1 || i % 90 === 0)) continue;
        let futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        data.push({
          x: futureDate.toISOString().split('T')[0],
          y: candidate.dailyProphetProbabilities[i].probabilityProphet,
          age: candidate.calculateAge(futureDate),
        });
      }
      graphData.push({
        id: candidate.name,
        ordinationDate: new Date(candidate.ordinationDate),
        data,
      });
      graphData.sort((a: any, b: any) => {
        return b.ordinationDate.getTime() - a.ordinationDate.getTime();
      });
    }
    return graphData;
  }
}
