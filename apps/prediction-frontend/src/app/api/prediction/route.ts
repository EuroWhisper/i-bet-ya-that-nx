import { NextResponse } from 'next/server';

import { prisma } from '../../../utils/db';

export async function GET() {
  try {
    const predictions = await prisma.prediction.findMany();
    return NextResponse.json(predictions);
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}
