import { startTraining } from '../fsm/train.fsm.js';
import { handleTrainingAnswer } from './trainingAnswer.handler.js';

export const callbackTrain = async (ctx) => {
  return startTraining(ctx);
};

export const handleTrainCallback = async (ctx) => {
  if (ctx.session.step === 'training') {
    return handleTrainingAnswer(ctx);
  }

  return ctx.answerCallbackQuery({ text: '⚠️ Это не часть тренировки.' });
};
