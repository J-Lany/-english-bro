import { backMenu } from '../keyboards/backMenu.js';
import { safeReplyText } from '../utils/safe-replies.js';

export default async function handleBack(ctx) {
  return safeReplyText(ctx, '🔙 Окей, мы вернулись в меню:', backMenu);
}
