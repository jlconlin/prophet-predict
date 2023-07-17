import {
  ActuarialLifeTableRawType,
  ActuarialLifeTableType,
  DailyRates,
} from '@/types/index';

import actuarialLifeTableRawData from '@/data/actuarialLifeTable.json';
const actuarialLifeTableRaw: ActuarialLifeTableRawType =
  actuarialLifeTableRawData;

export class ActuarialLifeTable implements ActuarialLifeTableType {
  raw: ActuarialLifeTableRawType;
  dailyRates: DailyRates;

  constructor() {
    this.raw = actuarialLifeTableRaw;
    this.dailyRates = {};
    this.calculateDailyRates();
  }

  calculateDailyRates(): void {
    for (let year = 0; year <= 118; year++) {
      for (let day = 0; day <= 365; day++) {
        const ageDays = year * 365 + day;
        const previousDeathProbability = this.raw[year].probabilityDead;
        const previousLifeExpectancy = this.raw[year].probabilityLiving;
        const nextDeathProbability = this.raw[year + 1].probabilityDead;
        const nextLifeExpectancy = this.raw[year + 1].probabilityLiving;

        const deathProbability =
          previousDeathProbability +
          ((nextDeathProbability - previousDeathProbability) / 365) * day;

        const lifeExpectancy =
          previousLifeExpectancy +
          ((nextLifeExpectancy - previousLifeExpectancy) / 365) * day;

        this.dailyRates[ageDays] = {
          deathProbability,
          lifeExpectancy,
        };
      }
    }
  }
}
