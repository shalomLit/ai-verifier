import { OpenAIApi, Configuration } from "openai";
import { NextResponse } from 'next/server';


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req) {
  console.log(req, "req");
  const { messages } = await req.json()
  console.log(messages, "messages");
  if (messages !== undefined) {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `${messages}`}],
      max_tokens: 50,
    });
      // const response = await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt: `${messages}`,
      //   max_tokens: 10,
      // });
    console.log(response, "response");
    const resText = response.data.choices[0].message.content;
    console.log(resText, "resText");

    return NextResponse.json(resText);

  }
}



