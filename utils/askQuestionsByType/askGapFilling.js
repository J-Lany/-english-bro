export function askGapFilling(ctx, question) {
  ctx.session.training.expectTextInput = true;
  ctx.session.training.expectedAnswer = question.correctAnswer;

  return ctx.reply(
    `✍️ <b>Fill in the gap:</b>\n\n${question.question}\n\n<i>Text your answer</i>`,
    { parse_mode: 'HTML' }
  );
}
