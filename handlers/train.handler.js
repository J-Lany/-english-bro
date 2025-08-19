import { handleTrainingAnswer } from './trainingAnswer.handler.js';
import { User } from '../models/user.js';
import { sendLessonsPage } from './utils/sendLessonsPage.js';

export const callbackTrain = async (ctx) => {
  const telegramId = ctx.from.id;
  const user = await User.findOne({ telegramId });

  if (!user.lessons.length) {
    return ctx.reply(
      '📭 У тебя пока нет уроков. Добавь слова, чтобы создать урок.',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '➕ Добавить новые слова', callback_data: 'add_word' }],
          ],
        },
      }
    );
  }

  if (ctx.callbackQuery) {
    await ctx.answerCallbackQuery();
  }

  ctx.session.lessonsContext = {
    command: 'select_lesson',
    pageText: '📚 Choose the list:',
  };

  return sendLessonsPage(ctx, 'select_lesson', '📚 Choose the list:');
};
export const handleTrainCallback = async (ctx) => {
  if (ctx.session.step === 'training') {
    return handleTrainingAnswer(ctx);
  }

  return ctx.answerCallbackQuery({ text: '⚠️ Это не часть тренировки.' });
};
