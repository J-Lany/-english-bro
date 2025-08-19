import { User } from '../models/user.js';

export async function enableNotifications(ctx) {
  const user = await User.findOne({ telegramId: ctx.from.id });

  if (!user) {
    await ctx.reply('❌ Пользователь не найден в базе.');
    return;
  }

  if (user.notificationsEnabled) {
    return ctx.reply('ℹ️ Уведомления уже включены — всё в порядке! 👍');
  } else {
    user.notificationsEnabled = true;
    await user.save();
    return ctx.reply(
      '🔔 Уведомления снова включены! Теперь я буду напоминать тебе о тренировках.'
    );
  }
}
