import {v4 as uuidv4} from 'uuid';
import {
  CandidateType,
  CandidateRawType,
  ProphetPredictionDate,
} from '@/types/index';

export class Candidate implements CandidateType {
  name: string;
  dob: Date;
  ordinationDate: Date;
  seniorApostles: number[];
  dates: ProphetPredictionDate[];
  id: string;

  constructor(candidateRaw: CandidateRawType) {
    this.name = candidateRaw.name;
    this.dob = new Date(candidateRaw.dob);
    this.ordinationDate = new Date(candidateRaw.ordinationDate);
    this.seniorApostles = [];
    this.dates = [];
    this.id = uuidv4();
  }
}
