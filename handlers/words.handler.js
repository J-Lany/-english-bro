import { sendLessonsPage } from './utils/sendLessonsPage.js';
import { User } from '../models/user.js';

export async function callbackWords(ctx) {
  const user = await User.findOne({ telegramId: ctx.from.id });
  if (!user) return ctx.reply('Начни с кнопкочки /start');

  ctx.session.page = 0;
  ctx.session.lessonsContext = {
    command: 'select_words_lesson',
    pageText: '🔹 Созданные уроки',
  };

  try {
    return sendLessonsPage(
      ctx,
      'select_words_lesson',
      ctx.session.lessonsContext.pageText
    );
  } catch (err) {
    console.error('Error in words:', err);
    return ctx.reply('❌ Ошибка при получении уроков. Попробуй позже.');
  }
}
