import { backMenu } from '../keyboards/backMenu.js';
import { safeReplyText } from '../utils/safe-replies.js';

export default async function handleBack(ctx) {
  await ctx.answerCallbackQuery?.();

  ctx.session = {};
  return safeReplyText(ctx, '🔙 Окей, мы вернулись в меню:', backMenu);
}
