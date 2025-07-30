import { translateWords } from '../utils/translateWortd.js';
import { setNewWords } from '../services/lessonService.js';

export const handleTextMessage = async (ctx) => {
  const telegramId = ctx.from.id;
  const step = ctx.session.step;

  if (step === 'adding_words') {
    const input = ctx.message.text;
    const items = input
      .split('.')
      .map((w) => w.trim())
      .filter(Boolean);

    if (items.length === 0) {
      return ctx.reply('⚠️ Не найдено ни одного слова. Разделяй их точками.');
    }

    try {
      const translations = await translateWords(items);
      await setNewWords(translations, telegramId);

      ctx.session.step = null;

      return ctx.reply(
        '✅ Добавлено:\n\n' +
          translations.map((w) => `${w.en} — ${w.ru}`).join('\n')
      );
    } catch (err) {
      console.error('GPT Error:', err, 'time drop:', Date.now());
      return ctx.reply('❌ Не удалось получить перевод. Попробуй позже.');
    }
  }

  return ctx.reply('❓ Не понял. Нажми /start и выбери действие из меню.');
};

export const callbackAddWord = async (ctx) => {
  ctx.session.step = 'adding_words';
  await ctx.reply(
    '✍️ Введи слова или фразы на английском, разделяя точками:\n\nПример:\n`go out.` `stand up.`'
  );
};
