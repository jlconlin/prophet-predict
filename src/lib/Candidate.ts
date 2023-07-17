import {v4 as uuidv4} from 'uuid';
import {
  CandidateType,
  CandidateRawType,
  DailyRatesType,
  dailyProphetProbabilitiesType,
} from '@/types/index';

export class Candidate implements CandidateType {
  id: string;
  name: string;
  birthDate: Date;
  ageDays!: number;
  ageYears!: number;
  ordinationDate: Date;
  seniorApostles: string[];
  dailyLifeExpectancies: DailyRatesType;
  dailyProphetProbabilities: dailyProphetProbabilitiesType;

  constructor(candidateRaw: CandidateRawType) {
    this.name = candidateRaw.name;
    this.birthDate = new Date(candidateRaw.dob);
    this.ordinationDate = new Date(candidateRaw.ordinationDate);
    this.seniorApostles = [];
    this.dailyLifeExpectancies = {};
    this.dailyProphetProbabilities = {};
    this.id = uuidv4();
    this.calculateAges();
  }

  calculateAges(): void {
    this.ageDays = Math.floor(
      (new Date().getTime() - this.birthDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    this.ageYears = Math.floor(this.ageDays / 365);
  }

  calculateDailyLifeExpectancies(actuarialLifeTable: DailyRatesType): void {
    for (let year: number = 0; year <= 118 - this.ageYears; year++) {
      this.calculateOneYearLifeExpectancy(year, actuarialLifeTable);
    }
  }

  calculateOneYearLifeExpectancy(
    year: number,
    actuarialLifeTable: DailyRatesType
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
      const totalAgeDays = startDayOfYear + dayOfYear;
      const probabilityLiving =
        startProbabilityLiving - dayOfYear * livingIncrement;
      this.dailyLifeExpectancies[totalAgeDays] = {
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
    actuarialLifeTable: DailyRatesType
  ): number {
    const livingProbabilities: number[] = [];
    for (let i = 0; i <= year; i++) {
      livingProbabilities.push(
        1 - actuarialLifeTable[this.ageDays + i * 365].probabilityDead
      );
    }
    return livingProbabilities.reduce((a, b) => a * b);
  }
}
