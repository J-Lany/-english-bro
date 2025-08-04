import { handleTrainingTextAnswer } from './trainingTextAnswer.handler.js';
import { handleAddWordTextMessage } from './addWord.handler.js';

export const handleTextMessageRouter = async (ctx) => {
  const step = ctx.session?.step;

  if (step === 'training' && ctx.session.training.expectTextInput) {
    return handleTrainingTextAnswer(ctx);
  }

  if (step === 'adding_words' || step === 'naming_lesson') {
    return handleAddWordTextMessage(ctx);
  }

  return ctx.reply(
    '❓Прости, я тебя не поняла… Нажми /start и я помогу тебе 💫'
  );
};
