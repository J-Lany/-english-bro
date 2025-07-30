import { getTranslateFromAi } from '../services/openaiService.js';
import { trimJson } from './trimJson.js';

export async function translateWords(items) {
  const wordsFromAi = await getTranslateFromAi(items);
  const clearJson = trimJson(wordsFromAi);

  return JSON.parse(clearJson);
}
