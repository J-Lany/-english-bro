import { askNextQuestion } from './utils/askNextQuestion.js';
import { buildAnswerFeedback } from './utils/buildAnswerFeedback.js';
import { finishTraining } from './utils/finishTraining.js';

export const handleTrainingAnswer = async (ctx) => {
  const index = parseInt(ctx.callbackQuery.data.replace('train_', ''), 10);
  const { training } = ctx.session;

  const current = training.questions[training.index];
  const selected = training.currentOptions?.[index];

  const isCorrect = selected?.text === current.correctAnswer;
  training.correct += isCorrect ? 1 : 0;
  training.index += 1;

  await buildAnswerFeedback({
    isCorrect,
    correctAnswer: current.correctAnswer,
    explanation: current.explanation,
    translation: current.translation,
    examples: current.examples,
    ctx,
  });

  if (training.index >= training.total) {
    return finishTraining(ctx, training);
  }

  return askNextQuestion(ctx);
};
