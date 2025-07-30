import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { getTranslatePrompt } from '../utils/prompts/getTranslatePrompt.js';
import { getTrainingPrompt } from '../utils/prompts/getTrainingPrompt.js';
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120_000,
});

export const getTranslateFromAi = async (words) => {
  const prompt = getTranslatePrompt(words);

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a English Teacher' },
        { role: 'user', content: prompt },
      ],
    });

    const reply = response.choices[0].message.content;
    return reply;
  } catch (err) {
    console.log(err);
  }
};

export const getTrainingFromAi = async (words) => {
  const prompt = getTrainingPrompt(words);

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a English Teacher' },
        { role: 'user', content: prompt },
      ],
    });

    const reply = response.choices[0].message.content;
    return reply;
  } catch (err) {
    console.log(err);
  }
};
