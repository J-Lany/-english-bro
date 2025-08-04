import { User } from '../models/user.js';

export async function disableNotifications(ctx) {
  await User.findOneAndUpdate(
    { telegramId: ctx.from.id },
    { notificationsEnabled: false }
  );

  await ctx.answerCallbackQuery();
  await ctx.reply(
    '🚫 Уведомления отключены. Вы всегда можете включить их снова в настройках.'
  );
}
