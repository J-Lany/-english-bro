import { askDefinitionQuiz } from '../../utils/askQuestionsByType/askDefinitionQuiz.js';
import { askGapFilling } from '../../utils/askQuestionsByType/askGapFilling.js';
import { askPhraseFail } from '../../utils/askQuestionsByType/askPhraseFail.js';
import { askCollocationCheck } from '../../utils/askQuestionsByType/askCollocationCheck.js';

export const askNextQuestion = async (ctx) => {
  const { training } = ctx.session;
  const question = training.questions[training.index];

  const handlerMap = {
    definition_quiz: askDefinitionQuiz,
    gap_filling: askGapFilling,
    phrase_fail: askPhraseFail,
    collocation_check: askCollocationCheck,
  };

  const handler = handlerMap[training.trainingType];

  if (!handler) {
    return ctx.reply('⚠️ Неизвестный тип тренировки.');
  }

  return handler(ctx, question);
};
