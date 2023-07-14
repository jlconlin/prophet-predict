import {NextResponse} from 'next/server';
import {ProphetPredictionType} from '@/types/index';
import {ProphetPrediction} from '@/lib/ProphetPredication';

export async function GET(): Promise<NextResponse> {
  const prophetPrediction = new ProphetPrediction();
  const responseBody: ProphetPredictionType = prophetPrediction;

  return NextResponse.json(responseBody);
}
