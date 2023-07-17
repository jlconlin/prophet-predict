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
  birthDate: Date;
  ordinationDate: Date;
  seniorApostles: string[];
  dailyLifeExpectancies: DailyLifeExpectanciesType;
  ageYears: number;
  id: string;
  ageDays!: number;
  actuarialTable!: DailyRate;

  constructor(candidateRaw: CandidateRawType) {
    this.name = candidateRaw.name;
    this.birthDate = new Date(candidateRaw.dob);
    this.ordinationDate = new Date(candidateRaw.ordinationDate);
    this.seniorApostles = [];
    this.dailyLifeExpectancies = {};
    this.id = uuidv4();
    this.calculateageDays();
    this.ageYears = Math.floor(this.ageDays / 365);
  }

  calculateageDays(): void {
    this.ageDays = Math.floor(
      (new Date().getTime() - this.birthDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  loadActuarialTableValues(actuarialLifeTable: DailyRates): void {
    this.actuarialTable = actuarialLifeTable[this.ageDays];
  }

  calculateDailyLifeExpectancies(actuarialLifeTable: DailyRates): void {
    for (let year: number = 0; year <= 118 - this.ageYears; year++) {
      this.calculateOneYearLifeExpectancy(year, actuarialLifeTable);
    }
  }

  calculateOneYearLifeExpectancy(
    year: number,
    actuarialLifeTable: DailyRates
  ): void {
    const startDayOfYear = year * 365;
    const startProbabilityLiving = this.getStartProbabilityLiving(year);
    const endingProbabilityLiving = this.calculateEndingProbabilityLiving(
      year,
      actuarialLifeTable
    );
    const livingIncrement =
      (startProbabilityLiving - endingProbabilityLiving) / 365;

    for (let dayOfYear = 0; dayOfYear <= 365; dayOfYear++) {
      const totalageDays = startDayOfYear + dayOfYear;
      const probabilityLiving =
        startProbabilityLiving - dayOfYear * livingIncrement;
      this.dailyLifeExpectancies[totalageDays] = {
        probabilityLiving,
        probabilityDead: 1 - probabilityLiving,
      };
    }
  }

  getStartProbabilityLiving(year: number): number {
    return year === 0
      ? 1
      : this.dailyLifeExpectancies[year * 365].probabilityLiving;
  }

  calculateEndingProbabilityLiving(
    year: number,
    actuarialLifeTable: DailyRates
  ): number {
    const livingProbabilities: number[] = [];
    for (let i = 0; i <= year; i++) {
      livingProbabilities.push(
        1 - actuarialLifeTable[this.ageDays + i * 365].deathProbability
      );
    }
    return livingProbabilities.reduce((a, b) => a * b);
  }
}
