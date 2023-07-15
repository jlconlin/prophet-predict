import {v4 as uuidv4} from 'uuid';
import {
  CandidateType,
  CandidateRawType,
  DailyRates,
  DailyRate,
  DailyLifeExpectanciesType,
} from '@/types/index';

export class Candidate implements CandidateType {
  name: string;
  dob: Date;
  ordinationDate: Date;
  seniorApostles: string[];
  dailyLifeExpectancies: DailyLifeExpectanciesType;
  id: string;
  daysSinceBirth!: number;
  actuarialTable!: DailyRate;

  constructor(candidateRaw: CandidateRawType) {
    this.name = candidateRaw.name;
    this.dob = new Date(candidateRaw.dob);
    this.ordinationDate = new Date(candidateRaw.ordinationDate);
    this.seniorApostles = [];
    this.dailyLifeExpectancies = {};
    this.id = uuidv4();
    this.calculateDaysSinceBirth();
  }

  calculateDaysSinceBirth(): void {
    this.daysSinceBirth = Math.floor(
      (new Date().getTime() - this.dob.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  loadActuarialTableValues(actuarialLifeTable: DailyRates): void {
    this.actuarialTable = actuarialLifeTable[this.daysSinceBirth];
  }

  calculateDailyLifeExpectancies(actuarialLifeTable: DailyRates): void {
    const deathIncrement = this.actuarialTable.deathProbability / 365;
    for (let i = 0; i <= 365; i++) {
      const probabilityDead = i * deathIncrement;
      const probabilityLiving = 1 - probabilityDead;
      this.dailyLifeExpectancies[i] = {
        probabilityLiving,
        probabilityDead,
      };
    }
  }
}
