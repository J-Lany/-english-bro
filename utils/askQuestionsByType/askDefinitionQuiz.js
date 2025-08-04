import { sendQuizWithOptions } from './sendQuizWithOptions.js';

export function askDefinitionQuiz(ctx, question) {
  return sendQuizWithOptions(
    ctx,
    `<b>📘 Phrase:</b> ${question.question}`,
    question.correctAnswer,
    question.incorrectAnswers,
    '',
    true
  );
}
