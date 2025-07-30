import { saveTrainingResult } from '../services/trainingService.js';
import { askNextQuestion } from '../utils/askNextQuestion.js';

export const handleTrainingAnswer = async (ctx) => {
  const data = ctx.callbackQuery.data;
  const value = data.replace('train_', '');

  const { training } = ctx.session;
  const current = training.questions[training.index];

  const isCorrect = value === current.correctAnswer;
  training.correct += isCorrect ? 1 : 0;
  training.index += 1;

  await ctx.answerCallbackQuery({
    text: isCorrect
      ? '✅ Правильно!'
      : `❌ Неверно. Правильно: ${current.correctAnswer}`,
  });

  if (training.index >= training.total) {
    await saveTrainingResult(ctx.from.id, training);

    ctx.session.step = null;

    return ctx.reply(
      `🏁 Тренировка завершена!\n\nПравильных ответов: ${training.correct} из ${training.total}`
    );
  }

  return askNextQuestion(ctx);
};
