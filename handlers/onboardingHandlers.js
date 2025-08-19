import { InlineKeyboard } from 'grammy';
import { createUserWithProfile } from '../services/userService.js';
import { mainMenuKeyboard } from '../keyboards/inline.js';
import { REG_SUCSESS_VIDEO } from '../utils/media.js';

export const handleOnboarding = async (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data.startsWith('level_')) {
    const level = data.replace('level_', '');
    ctx.session.onboarding = { level };
    ctx.session.step = 'onboarding_age';

    return ctx.reply('<b>Вопрос 2:</b> Сколько тебе лет? 👇', {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard()
        .text('до 12', 'age_child')
        .text('от 12 до 18', 'age_teen')
        .text('от 18', 'age_adult'),
    });
  }

  if (data.startsWith('age_')) {
    const ageGroup = data.replace('age_', '');
    const telegramId = ctx.from.id;
    const level = ctx.session.onboarding?.level || 'unknown';

    await createUserWithProfile({ telegramId, level, ageGroup });

    ctx.session.step = null;
    ctx.session.onboarding = null;

    return ctx.replyWithVideo(REG_SUCSESS_VIDEO, {
      caption:
        '🎉 Спасибки! Всё заполнено, можем приступать к тренировкам! 😊\n\nНачни с раздела «Добавить слова» 😉😊',
      reply_markup: mainMenuKeyboard,
    });
  }
};
