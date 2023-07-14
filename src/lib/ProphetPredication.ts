import {ProphetPredictionType, CandidateType} from '@/types/index';

export class ProphetPrediction implements ProphetPredictionType {
  candidates: CandidateType[];

  constructor() {
    this.candidates = [];
  }

  calculate(): void {}
}
