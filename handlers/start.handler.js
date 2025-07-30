import { User } from '../models/user.js';
import { mainMenuKeyboard } from '../keyboards/inline.js';

export const startCommand = async (ctx) => {
  const telegramId = ctx.from.id;
  let user = await User.findOne({ telegramId });
  if (!user) {
    await User.create({ telegramId, words: [], lessons: [] });
  }

  await ctx.reply(
    '👋 Привет! Я English Sister – твой бот-тренажёр для английских слов.\n\nЧто будем делать?',
    { reply_markup: mainMenuKeyboard }
  );
};
