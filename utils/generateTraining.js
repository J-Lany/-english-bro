import { getTrainingFromAi } from '../services/openaiService.js';
import { trimJson } from './trimJson.js';

export async function generateTraining(words) {
  const trainingFromAi = await getTrainingFromAi(words);
  const clearJson = trimJson(trainingFromAi);
  console.log(clearJson);
  return JSON.parse(clearJson)
}
