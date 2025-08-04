import { askNextQuestion } from './utils/askNextQuestion.js';
import { isAnswerCorrect } from '../utils/text/compareText.js';
import { buildAnswerFeedback } from './utils/buildAnswerFeedback.js';
import { finishTraining } from './utils/finishTraining.js';
export const handleTrainingTextAnswer = async (ctx) => {
  const { training } = ctx.session;

  const userAnswer = ctx.message.text;
  const correctAnswer = training.expectedAnswer;
  const current = training.questions[training.index];

  const isCorrect = isAnswerCorrect(userAnswer, correctAnswer);

  if (isCorrect) {
    training.correct += 1;
    training.index += 1;
    training.expectTextInput = false;
    training.attemptsLeft = 3;

    const feedback = buildAnswerFeedback({
      isCorrect,
      correctAnswer,
      explanation: current.explanation,
      translation: current.translation,
      examples: current.examples,
      trainingType: training.trainingType,
    });

    await ctx.reply(feedback);

    if (training.index >= training.total) {
      return finishTraining(ctx, training);
    }

    return askNextQuestion(ctx);
  }

  training.attemptsLeft = training.attemptsLeft ? training.attemptsLeft - 1 : 2;

  if (training.attemptsLeft > 0) {
    return ctx.reply(`❌ Try again. Attempts left: ${training.attemptsLeft}`);
  } else {
    const feedback = buildAnswerFeedback({
      isCorrect: false,
      correctAnswer,
      explanation: current.explanation,
      translation: current.translation,
      examples: current.examples,
    });

    training.index += 1;
    training.expectTextInput = false;
    training.attemptsLeft = 3;

    await ctx.reply(feedback);

    if (training.index >= training.total) {
      return finishTraining(ctx, training);
    }

    return askNextQuestion(ctx);
  }
};
