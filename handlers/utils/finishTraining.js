import { saveTrainingResult } from '../../services/trainingService.js';
import { InlineKeyboard } from 'grammy';
import { APPLAUSE_VIDEO } from '../../utils/media.js';

export async function finishTraining(ctx, training) {
  const { newAchievements, levelUp } = await saveTrainingResult(
    ctx.from.id,
    training
  );

  let message = `🏁 You’ve finished — great job!\n\nYou got ${training.correct} out of ${training.total} — keep going!\n\n`;

  if (levelUp) {
    message += `🎉 Congrats! You reached level: ${levelUp.level} — ${levelUp.title}!\n\n`;
  }

  if (newAchievements.length > 0) {
    message += '<b>🎖 You’ve unlocked new achievements:</b>\n';
    for (const ach of newAchievements) {
      message += `   <i>🏅 ${ach.name} — ${ach.description}</i>\n`;
    }
    message += '\n';
  }

  ctx.session.step = null;
  ctx.session.selectedLessonId = null;

  const keyboard = new InlineKeyboard()
    .text('📊 Статистика', 'stats')
    .text('🧠 Потренить еще', 'train');

  return ctx.replyWithVideo(APPLAUSE_VIDEO, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: 'HTML',
  });
}
