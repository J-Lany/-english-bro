import { translateWords } from './utils/translateWortd.js';
import { saveLessonWithWords } from '../services/lessonService.js';
import { User } from '../models/user.js';

export const callbackAddWord = async (ctx) => {
  const user = await User.findOne({ telegramId: ctx.from.id });
  if (!user) return ctx.reply('Начни с кнопкочки /start');

  ctx.session.step = 'adding_words';
  return ctx.reply(
    `✍️ Введи английские слова или выражения, разделяя их точками:\n\n` +
      `Пример:\n<b>go out. stand up. do the chores</b>\n\n` +
      `💡<i>Совет: чем точнее и контекстнее будут фразы, тем полезнее получится тренировка.\n\n</i>` +
      `<i>Например:\nget down ➡️ get down to business
 carry ➡️ carry on</i>` +
      `\n\n<i>️❗️Рекомендация от LexiBuddy: если ты учишь длинный список слов - не добавляй его в одну тренировку: лучше вноси по 4-5 новых фразы в день и сразу же тренируй их в 3-4 разных типах упражнений. Так слова будут запоминаться быстрее, а ты не будешь переживать из-за больших и тяжело усваиваемых объемов новой лексики!</i>`,
    { parse_mode: 'HTML' }
  );
};

export const handleAddWordTextMessage = async (ctx) => {
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

    await ctx.reply('⏳ Hold on… AI just needs a sec to work its magic! 🧚✨');

    try {
      const translations = await translateWords(items);

      ctx.session.temp = ctx.session.temp || {};
      ctx.session.temp.words = translations;

      ctx.session.step = 'naming_lesson';

      return ctx.reply(
        '📝 Теперь введи имя для нового урока.\n\nНапример: Phrasal Verbs 1'
      );
    } catch (err) {
      console.error('GPT Error:', err, 'time drop:', Date.now());
      return ctx.reply(
        'Oops! Our AI’s feeling a bit tired and needs a short break 💤 Please try again in a little while 🙏'
      );
    }
  }

  if (step === 'naming_lesson') {
    const lessonName = ctx.message.text.trim();
    if (!lessonName) {
      return ctx.reply('⚠️ Имя урока не может быть пустым. Введи снова.');
    }

    const words = ctx.session.temp.words;
    await saveLessonWithWords(telegramId, words, lessonName);

    ctx.session.step = null;
    ctx.session.temp = {};

    return ctx.reply(
      '✅ Done!\n\n' +
        words.map((w) => `${w.en} — ${w.ru} (${w.syn})`).join('\n'),
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🚀 К тренировке', callback_data: 'train' }],
          ],
        },
      }
    );
  }

  return ctx.reply(
    '❓Прости, я тебя не поняла… Нажми /start и я помогу тебе 💫'
  );
};
