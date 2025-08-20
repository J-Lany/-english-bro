import { User } from '../models/user.js';

export async function enableNotifications(ctx) {
  const user = await User.findOne({ telegramId: ctx.from.id });

  if (!user) {
    const replay =
      '❌ <b>Пользователь не найден в базе.</b>\n\n' +
      'Попробуй перезапустить бота командой /start.';
    await ctx.reply(replay);
    return;
  }

  if (user.notificationsEnabled) {
    const replay =
      '⚙️ <b>Уведомления уже включены</b> — всё в порядке! 👍\n\n' +
      '🕒 <i>Уведомления приходят максимум 1 раз в неделю, только если ты не заходил в бота.</i>';
    return ctx.reply(replay, {
      parse_mode: 'HTML',
    });
  } else {
    user.notificationsEnabled = true;
    await user.save();

    return ctx.reply(
      '🔔 <b>Уведомления снова включены!</b>\n\n' +
        'Теперь я буду напоминать тебе о тренировках.\n\n' +
        '🕒 <i>Уведомления приходят максимум 1 раз в неделю, только если ты не заходил в бота.</i>',
      {
        parse_mode: 'HTML',
      }
    );
  }
}
