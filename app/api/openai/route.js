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
    const content = `If the following statement is a fact, meaning the result is either true or false, you should respond with one of the following: "Yes, you are right." or "No, you are not right this time." If it is not a fact and it's a question, please respond with: "Sorry, but you should ask a question that can be answered with either true or false". Try to respond to the following sentence following the rules we defined: ${messages}`;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `${content}`}],
      max_tokens: 50,
    });
    console.log(response, "response");
    const resText = response.data.choices[0].message.content;
    console.log(resText, "resText");

    return NextResponse.json(resText);

  }
}



