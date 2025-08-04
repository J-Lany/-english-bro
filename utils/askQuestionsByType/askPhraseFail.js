import { sendQuizWithOptions } from './sendQuizWithOptions.js';

export function askPhraseFail(ctx, question) {
  return sendQuizWithOptions(
    ctx,
    '',
    question.correctAnswer,
    question.incorrectAnswers,
    '❌ <b>Find the wrong usage:</b>',
    true
  );
}
