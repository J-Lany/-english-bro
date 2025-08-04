import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { getTranslatePrompt } from '../utils/prompts/getTranslatePrompt.js';
import { getTrainingPrompt } from '../utils/prompts/getTrainingPrompt.js';
import { shuffleArray } from '../utils/shuffle.js';
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

export const getTrainingFromAi = async ({
  words,
  level,
  ageGroup,
  trainingType,
}) => {
  const phrases = shuffleArray(words)
    .map((w) => w.en)
    .join(', ');
  const prompt = `${getTrainingPrompt({ level, ageGroup, trainingType })}\n\nHere is the list of target phrases:\n${phrases}`;

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an English Teacher.' },
        { role: 'user', content: prompt },
      ],
    });

    const reply = response.choices[0].message.content;
    return reply;
  } catch (err) {
    console.error('❌ GPT Error:', err);
    throw new Error('AI training generation failed');
  }
};
