import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const client = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export async function POST(req) {
  const { provider, userInput, userInstruction } = await req.json();

  const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: userInstruction },
        { role: 'user', content: userInput },
      ],
      model: provider,
  });

  const result = response.choices[0]?.message.content || 'No response from model';
  const resp = {
      role: 'assistant',
      content: result
  };
  
  return NextResponse.json(resp);
}


