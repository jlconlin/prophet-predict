import {NextResponse} from 'next/server';
import {ProphetPredictionType, graphDataType} from '@/types/index';
import {ProphetPrediction} from '@/lib/ProphetPredication';

// Revalidate once per day (24 hours = 86400 seconds)
export const revalidate = 86400;

export async function GET(): Promise<NextResponse> {
  const prophetPrediction: ProphetPredictionType = new ProphetPrediction();
  const responseBody: graphDataType[] = prophetPrediction.returnGraphData();

  return NextResponse.json(responseBody, {
    headers: {
      // Cache on CDN for 24 hours, allow stale content while revalidating for 12 hours
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
