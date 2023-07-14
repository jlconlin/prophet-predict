import {NextRequest, NextResponse} from 'next/server';

interface MyResponse {
  id: number;
  name: string;
  todd: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const responseBody: MyResponse = {id: 1, name: 'test', todd: 'bill'};

  return NextResponse.json(responseBody);
}
