import { User } from '../models/user.js';
import { mainMenuKeyboard } from '../keyboards/inline.js';
import { InlineKeyboard } from 'grammy';
import { HELLO_VIDEO } from '../utils/media.js';

export const startCommand = async (ctx) => {
  const telegramId = ctx.from.id;
  let user = await User.findOne({ telegramId });

  if (!user) {
    ctx.session.step = 'onboarding_level';

    return ctx.replyWithVideo(HELLO_VIDEO, {
      caption: `👋 <b>Привет-привет!</b>

Я Lexi Buddy — твоя личная помощница для тренировки английских слов и выражений.

Вместе мы превратим изучение слов в лёгкое и увлекательное приключение✨
Но сначала давай познакомимся! 😊

<b>Вопрос 1:</b> Какой у тебя сейчас уровень английского? 👇`,
      reply_markup: new InlineKeyboard()
        .text('Начальный (Beginner)', 'level_beginner')
        .row()
        .text('Средний (Intermediate)', 'level_intermediate')
        .row()
        .text('Продвинутый (Advanced)', 'level_advanced')
        .row(),
      parse_mode: 'HTML',
    });
  }

  return ctx.replyWithVideo(HELLO_VIDEO, {
    caption: `👋 Привет снова! Что будем делать?`,
    reply_markup: mainMenuKeyboard,
  });
};
