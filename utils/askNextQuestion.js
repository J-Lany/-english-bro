import { shuffleArray } from './shuffle.js';

export const askNextQuestion = async (ctx) => {
  const { training } = ctx.session;
  const question = training.questions[training.index];

  const variants = shuffleArray([
    question.correctAnswer,
    ...question.incorrectAnswers,
  ]).map((variant) => ({
    text: variant,
    callback_data: `train_${variant}`,
  }));

  const keyboard = {
    reply_markup: {
      inline_keyboard: [variants],
    },
  };

  await ctx.reply(` 🧠<b>${question.question}</b>`, {
    parse_mode: 'HTML',
    ...keyboard,
  });
};
