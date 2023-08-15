import { OpenAIApi, Configuration } from "openai";
import { NextResponse } from 'next/server'


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req) {
  console.log(req, "req");
  const { messages } = await req.json()
  console.log(messages, "messages");
  if (messages !== undefined) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${messages}`,
        max_tokens: 100,
      });
    const resText = response.data.choices[0].message

    return NextResponse.json({ resText })

  }
}



