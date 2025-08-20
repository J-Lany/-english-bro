import { User } from '../models/user.js';
import { getUserLevelInfo } from '../utils/userStats/userStats.js';
import { getProgressBar } from '../utils/userStats/progressBar.js';
import { InlineKeyboard } from 'grammy';
import { ACHIEVEMENTS } from '../utils/userStats/achivements/achievements.js';
import { THAMB_UP_TWO_VIDEO } from '../utils/media.js';

export async function callbackStats(ctx) {
  try {
    const telegramId = ctx.from.id;
    const user = await User.findOne({ telegramId });
    if (!user) {
      return ctx.reply(
        '❌ Пользователь не найден. Попробуйте начать с /start.'
      );
    }

    const levelInfo = getUserLevelInfo(user);

    if (!levelInfo) {
      return ctx.reply('У тебя пока нет статистики 😅');
    }

    const trainingsCount = user.trainings?.length || 0;
    const wordsCount = user.words?.length || 0;
    const lessonsCount = user.lessons?.length || 0;
    const passedTrainings = user.trainings?.filter((t) => t.attempts > 0) || [];
    const passedTrainingsCount = passedTrainings.length;
    let achievementList;

    if (user.achievements.length > 0) {
      const found = ACHIEVEMENTS.filter((a) =>
        user.achievements.includes(a.id)
      );
      achievementList = found
        .map((ach) => `   ➤  <b>${ach.name}</b> — ${ach.description}`)
        .join('\n');
    } else {
      achievementList = 'Пока нет достижений 😅';
    }

    let message = `📊 <b>Статистика</b>:\n\n`;
    message += `🏆 Текущий уровень: <b>${levelInfo.level} ${levelInfo.title}</b>\n`;
    message += `- Добавлено слов: <b>${wordsCount}</b>\n`;
    message += `- Создано уроков: <b>${lessonsCount}</b>\n`;
    message += `- Создано тренировок: <b>${trainingsCount}</b>\n`;
    message += `- Пройдено тренировок: <b>${passedTrainingsCount}</b>\n`;

    if (levelInfo.level === 1) {
      if (levelInfo.accuracy !== null) {
        message += `🎯 Точность на этом уровне: <b>${levelInfo.accuracy}%</b>\n\n`;
      }
    } else {
      if (levelInfo.trainingsInLevel === 0 && levelInfo.prevAccuracy !== null) {
        message += `🎯 Точность на предыдущем уровне: <b>${levelInfo.prevAccuracy}%</b>\n\n`;
      } else {
        if (levelInfo.accuracy !== null) {
          message += `🎯 Точность на этом уровне: <b>${levelInfo.accuracy}%</b>\n`;
        }
        if (levelInfo.prevAccuracy !== null) {
          message += `📊 Точность на предыдущем уровне: <b>${levelInfo.prevAccuracy}%</b>\n\n`;
        }
      }
    }

    message += `🎖 <b>Достижения</b>:<blockquote>${achievementList}</blockquote>\n\n`;

    message += getProgressBar(levelInfo.trainingsInLevel);
    message += `💡 Продолжай тренироваться, и пусть сила будет с тобой!`;

    const keyboard = new InlineKeyboard()
      .text('➕ Добавить слова', 'add_word')
      .text('🧠 Потренироваться', 'train')
      .row()
      .text('📚 Посмотреть список слов', 'words');

    return ctx.replyWithVideo(THAMB_UP_TWO_VIDEO, {
      caption: message,
      reply_markup: keyboard,
      parse_mode: 'HTML',
    });
  } catch (err) {
    console.error('Error in stats:', err);
    await ctx.reply('❌ Ошибка при получении статистики. Попробуй позже.');
  }
}
