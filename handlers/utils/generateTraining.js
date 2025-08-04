import { getTrainingFromAi } from '../../services/openaiService.js';
import { trimJson } from '../../utils/text/trimJson.js';

export async function generateTraining({
  words,
  level,
  ageGroup,
  trainingType,
}) {
  try {
    const aiResponse = await getTrainingFromAi({
      words,
      level,
      ageGroup,
      trainingType,
    });

    const clearJson = trimJson(aiResponse);
    const parsed = JSON.parse(clearJson);

    return parsed;
  } catch (err) {
    console.error('❌ Failed to generate training:', err);
    throw new Error('Не удалось сгенерировать тренировку. Попробуйте позже.');
  }
}
