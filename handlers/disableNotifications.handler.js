import { User } from '../models/user.js';

export async function disableNotifications(ctx) {
  await User.findOneAndUpdate(
    { telegramId: ctx.from.id },
    { notificationsEnabled: false }
  );

  return ctx.reply(
    '🚫 Уведомления отключены. Вы всегда можете включить их снова в настройках.'
  );
}
