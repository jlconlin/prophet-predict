import {ActuarialLifeTableRawType, ActuarialLifeTableType} from '@/types/index';

import actuarialLifeTableRawData from '@/data/actuarialLifeTable.json';
const actuarialLifeTableRaw: ActuarialLifeTableRawType =
  actuarialLifeTableRawData;

export class ActuarialLifeTable implements ActuarialLifeTableType {
  raw: ActuarialLifeTableRawType;

  constructor() {
    this.raw = actuarialLifeTableRaw;
  }
}
