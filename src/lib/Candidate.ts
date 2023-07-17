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
  ageYears: number;
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
    this.ageYears = Math.floor(this.daysSinceBirth / 365);
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
    for (let i: number = this.ageYears; i <= 118; i++) {
      const year: number = i - this.ageYears;
      this.calculateOneYearLifeExpectancy(year, actuarialLifeTable);
    }
  }

  calculateOneYearLifeExpectancy(
    year: number,
    actuarialLifeTable: DailyRates
  ): void {
    let startingProbabilityLiving: number;
    if (year === 0) {
      startingProbabilityLiving = 1;
    } else {
      startingProbabilityLiving =
        this.dailyLifeExpectancies[year * 365].probabilityLiving;
    }
    let endingProbabilityLiving: number = this.calculateEndingProbabilityLiving(
      year,
      actuarialLifeTable
    );
    let probabilityLivingDifference: number =
      startingProbabilityLiving - endingProbabilityLiving;
    let livingIncrement: number = probabilityLivingDifference / 365;

    for (let i = year * 365; i <= 365 * year + 365; i++) {
      const daysSinceStartOfCurrentYear = i - year * 365;
      this.dailyLifeExpectancies[i] = {
        probabilityLiving:
          startingProbabilityLiving -
          daysSinceStartOfCurrentYear * livingIncrement,
        probabilityDead:
          1 -
          (startingProbabilityLiving -
            daysSinceStartOfCurrentYear * livingIncrement),
      };
    }
  }

  calculateEndingProbabilityLiving(
    year: number,
    actuarialLifeTable: DailyRates
  ): number {
    const livingProbabilities: number[] = [];
    for (let i = 0; i <= year; i++) {
      livingProbabilities.push(
        1 - actuarialLifeTable[this.daysSinceBirth + i * 365].deathProbability
      );
    }
    const returnValue = livingProbabilities.reduce((a, b) => a * b);
    return returnValue;
  }
}
