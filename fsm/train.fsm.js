import { User } from '../models/user.js';
import { getToday } from '../utils/date.js';
import { generateTraining } from '../utils/generateTraining.js';
import { setNewTraining } from '../services/trainingService.js';
import { askNextQuestion } from '../utils/askNextQuestion.js';

export const startTraining = async (ctx) => {
  const telegramId = ctx.from.id;
  const user = await User.findOne({ telegramId });

  if (!user || user.words.length === 0) {
    return ctx.reply('📭 У тебя нет слов для тренировки.');
  }

  const today = getToday();
  let training = user.trainings.find((training) => training === today);

  if (!training) {
    const generatedTraining = await generateTraining(user.words);
    await setNewTraining(generatedTraining, user, today);
  }

  ctx.session.step = 'training';
  ctx.session.training = {
    index: 0,
    correct: 0,
    total: training.questions.length,
    questions: training.questions,
    trainingDate: training.date,
  };

  return askNextQuestion(ctx);
};
