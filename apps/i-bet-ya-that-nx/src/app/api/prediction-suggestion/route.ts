import { getPredictionSuggestion } from '@i-bet-ya-that-nx/chatgpt';
import { NextResponse } from 'next/server';

type Data = {
  message: string;
};

export async function GET() {
  try {
    const predictionSuggestion = await getPredictionSuggestion();
    if (!predictionSuggestion.content) {
      return NextResponse.json(
        { message: 'Content not found' },
        { status: 404 }
      );
    }
    return NextResponse.json<Data>({ message: predictionSuggestion.content });
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
