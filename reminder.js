import * as cron from 'node-cron';
import { User } from './models/user.js';
import bot from './bot.js';
import { SAD_FACE_VIDEO } from './utils/media.js';

export function reminder() {
  cron.schedule('0 10 * * *', async () => {
    console.log('🔔 Проверка пользователей для напоминания...');

    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const inactiveUsers = await User.find({
      notificationsEnabled: true,
      lastVisit: { $lt: weekAgo },
      $or: [{ lastNotification: null }, { lastNotification: { $lt: weekAgo } }],
    });

    for (const user of inactiveUsers) {
      await bot.api.sendVideo(user.telegramId, SAD_FACE_VIDEO, {
        caption:
          'Привет! 👋 📚\n\nБез тебя совсем грустно стало… 😢\n\nКак насчет тренировки?💪🏋️‍♀️',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🧠 Потренироваться', callback_data: 'train' }],
            [
              {
                text: '🚫 Выключить уведомления',
                callback_data: 'disable_notifications',
              },
            ],
          ],
        },
      });

      user.lastNotification = now;
      await user.save();
    }
  });
}

export function reminderTest() {
  // cron через 1 раз в 5 минут: "*/5 * * * *"
  cron.schedule('*/5 * * * *', async () => {
    console.log('🔔 Тестовая проверка пользователей для напоминания...');

    const now = new Date();
    const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000); // 2 минуты назад

    const inactiveUsers = await User.find({
      notificationsEnabled: true,
      lastVisit: { $lt: twoMinutesAgo },
      $or: [
        { lastNotification: null },
        { lastNotification: { $lt: twoMinutesAgo } },
      ],
    });

    for (const user of inactiveUsers) {
      await bot.api.sendVideo(user.telegramId, SAD_FACE_VIDEO, {
        caption:
          '👋 Давно не виделись! 📚\n\nГотов потренироваться сегодня? 💪',
        reply_markup: {
          inline_keyboard: [
            [{ text: '🧠 Потренироваться', callback_data: 'train' }],
            [
              {
                text: '🚫 Выключить уведомления',
                callback_data: 'disable_notifications',
              },
            ],
          ],
        },
      });

      user.lastNotification = now;
      await user.save();
    }
  });
}
