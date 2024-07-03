import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();

  try {
    const body = await req.json();
    await prisma.prediction.create({
      data: {
        prediction: body.prediction,
        email: body.email,
        reminderDate: body.reminderDate,
        reminderSent: false,
      },
    });
    return NextResponse.json({ message: 'Prediction created' });
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}

export async function GET() {
  const prisma = new PrismaClient();

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
