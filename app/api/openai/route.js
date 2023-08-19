import { OpenAIApi, Configuration } from "openai";
import { NextResponse } from 'next/server';
import { RIGHT_RESPONSE, WRONG_RESPONSE, INVALID_RESPONSE } from "@constants/responseTypes";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req) {
  const { messages } = await req.json();
  if (messages) {
    const systemMessage = {
      role: "system",
      content: `If the following statement is a fact, meaning the result is either true or false, you should respond with one of the following:
       "${RIGHT_RESPONSE.text}" or "${WRONG_RESPONSE.text}" If it is not a fact and it's a question, please respond with: "${INVALID_RESPONSE.text}"`,
    };

    const userMessage = {
      role: "user",
      content: messages,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, userMessage],
      max_tokens: 50,
    });

    const resText = response.data.choices[0].message.content;
    return NextResponse.json(resText);
  }
}



