import { getShuffledOptions } from '../shuffle.js';
import { InlineKeyboard } from 'grammy';

export function sendQuizWithOptions(
  ctx,
  questionText,
  correctAnswer,
  incorrectAnswers,
  introMessage,
  compact = false
) {
  const options = getShuffledOptions(correctAnswer, incorrectAnswers);

  ctx.session.training.currentOptions = options;
  const keyboard = new InlineKeyboard();

  options.forEach((opt, idx) => {
    keyboard.text(opt.symbol, `train_${idx}`);
    if (!compact) keyboard.row();
  });

  const answersText = options
    .map((opt) => `${opt.symbol} ${opt.text}`)
    .join('\n');

  return ctx.reply(`${introMessage}\n${questionText}\n${answersText}`, {
    parse_mode: 'HTML',
    reply_markup: keyboard,
  });
}
