export function askCollocationCheck(ctx, question) {
  ctx.session.training.expectTextInput = true;
  ctx.session.training.expectedAnswer = question.correctAnswer;

  return ctx.reply(
    `🔗 <b>Which phrase fits all collocations?</b>\n\n${question.question}\n\n<i>Text your answer</i>`,
    { parse_mode: 'HTML' }
  );
}
