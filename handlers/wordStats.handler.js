import { User } from '../models/user.js';

export const callbackStats = async (ctx) => {
  const telegramId = ctx.from.id;
  const user = await User.findOne({ telegramId });

  if (!user || user.words.length === 0) {
    return ctx.reply('📭 У тебя пока нет слов.');
  }

  const grouped = {};

  for (const lesson of user.lessons) {
    const words = lesson.wordIds
      .map((id) => user.words.find((w) => w._id.equals(id)))
      .filter(Boolean);

    if (words.length) {
      grouped[lesson.date] = words;
    }
  }

  let text = '';
  for (const date in grouped) {
    text += `📅 ${date}:\n`;
    for (const w of grouped[date]) {
      text += `• ${w.en} — ${w.ru}\n`;
    }
    text += '\n';
  }

  ctx.reply(text.trim());
};
