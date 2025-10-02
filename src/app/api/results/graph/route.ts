import {NextResponse} from 'next/server';
import {ProphetPredictionType, graphDataType} from '@/types/index';
import {ProphetPrediction} from '@/lib/ProphetPredication';

export const dynamic = 'force-dynamic';

export async function GET(): Promise<NextResponse> {
  const prophetPrediction: ProphetPredictionType = new ProphetPrediction();
  const responseBody: graphDataType[] = prophetPrediction.returnGraphData();
  return NextResponse.json(responseBody);
}
