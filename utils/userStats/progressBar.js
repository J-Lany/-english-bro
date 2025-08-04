import { pluralizeTrainings } from '../text/pluralizeTrainings.js';

export function getProgressBar(current, total = 4) {
  const filled = Math.min(current, total);
  const empty = total - filled;
  const nextLevelProgress = total - filled;

  const bar = '🟩'.repeat(filled) + '⬜'.repeat(empty);

  let message = `🔥 Прогресс до следующего уровня:\n      ${bar}  ${filled}/${total} тренировок\n\n`;
  message += `✨ Осталось всего <b>${nextLevelProgress}</b> ${pluralizeTrainings(nextLevelProgress)} до повышения уровня!\n\n`;

  return message;
}
