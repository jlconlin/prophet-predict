import {
  ActuarialLifeTableRawType,
  ActuarialLifeTableType,
  DailyRatesType,
} from '@/types/index';

import actuarialLifeTableRawData from '@/data/actuarialLifeTable.json';
const actuarialLifeTableRaw: ActuarialLifeTableRawType =
  actuarialLifeTableRawData;

export class ActuarialLifeTable implements ActuarialLifeTableType {
  raw: ActuarialLifeTableRawType;
  dailyRates: DailyRatesType;

  constructor() {
    this.raw = actuarialLifeTableRaw;
    this.dailyRates = {};
    this.calculateDailyRates();
  }

  calculateDailyRates(): void {
    for (let year = 0; year <= 118; year++) {
      for (let day = 0; day < 365; day++) {
        const ageDays = year * 365 + day;
        const previousDeathProbability = this.raw[year].probabilityDead;
        const nextDeathProbability = this.raw[year + 1].probabilityDead;

        const probabilityDead =
          previousDeathProbability +
          ((nextDeathProbability - previousDeathProbability) / 365) * day;

        const probabilityLiving = 1 - probabilityDead;

        this.dailyRates[ageDays] = {
          probabilityLiving,
          probabilityDead,
        };
      }
    }

    // Add final entry for age 119 year 0 (day 43435)
    if (this.raw[119]) {
      const ageDays = 119 * 365;
      this.dailyRates[ageDays] = {
        probabilityLiving: 1 - this.raw[119].probabilityDead,
        probabilityDead: this.raw[119].probabilityDead,
      };
    }
  }
}
