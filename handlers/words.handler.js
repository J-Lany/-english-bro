import { sendLessonsPage } from './utils/sendLessonsPage.js';

export async function callbackWords(ctx) {
  ctx.session.page = 0;
  ctx.session.lessonsContext = {
    command: 'select_words_lesson',
    pageText: '🔹 Созданные уроки',
  };

  try {
    await sendLessonsPage(
      ctx,
      'select_words_lesson',
      ctx.session.lessonsContext.pageText
    );
  } catch (err) {
    console.error('Error in words:', err);
    await ctx.reply('❌ Ошибка при получении уроков. Попробуй позже.');
  }
}
