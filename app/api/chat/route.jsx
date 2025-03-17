import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { DataAPIClient } from '@datastax/astra-db-ts';
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

const hf_embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGING_FACE_API_KEY,
  });


const client=new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN)
const db=client.db(process.env.ASTRA_DB_API_ENDPOINT,{
    namespace:process.env.ASTRA_DB_NAMESPACE
})

export async function POST(req) {
  const { provider, messages } = await req.json();

  const latestMessage=messages[messages?.length-1]?.content

  let docContext=""

  const embeddings = await hf_embeddings.embedDocuments([latestMessage]);


  const collection = await db.collection("my_portfolio")

  const cursor = collection.find({}, {
    sort: {
      $vector: embeddings[0],
    },
    limit: 10,
  });
  

  const documents = await cursor.toArray();

  console.log(documents);

  docContext=`
  START CONTEXT
  ${documents?.map(doc=>doc.description).join("\n")}
  END CONTEXT
  `

  console.log(docContext);

  const ragPrompt=[
    {
        role:'system',
        content:`
        You are an AI assistant answering questions as Sunkaraboina Praveen Kumar in his portfolio App. Behave like him as if he is talking.
        Format Responses using markdown wherever applicable.
        Use this context for answering:
        ${docContext}
        If the question is completely unrelated say i donot know.
        `
    }
  ]

  const response = await groq.chat.completions.create({
      messages: [...ragPrompt,...messages],
      model: provider,
  });

  const result = response.choices[0]?.message.content || 'No response from model';
  const resp = {
      role: 'assistant',
      content: result
  };
  
  return NextResponse.json(resp);
}


