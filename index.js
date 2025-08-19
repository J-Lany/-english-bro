import { GrammyError, HttpError } from 'grammy';
import dotenv from 'dotenv';
import bot from './bot.js';
import { connectDB } from './config/db.js';
import { startCommand } from './handlers/start.handler.js';
import { callbackAddWord } from './handlers/addWord.handler.js';
import {
  callbackTrain,
  handleTrainCallback,
} from './handlers/train.handler.js';
import { callbackStats } from './handlers/stats.handler.js';
import { handleOnboarding } from './handlers/onboardingHandlers.js';
import {
  handleSelectLesson,
  handleSelectTrainingType,
  handleShowLessonList,
} from './handlers/trainSelect.handler.js';
import { askNextQuestion } from './handlers/utils/askNextQuestion.js';
import { handleTextMessageRouter } from './handlers/textMessageRouter.handler.js';
import { callbackWords } from './handlers/words.handler.js';
import { handleSelectWords } from './handlers/wordsSelect.handler.js';
import handleBack from './handlers/back.handler.js';
import handleNextClick from './utils/pagination/next.js';
import handlePrevClick from './utils/pagination/previous.js';
import { reminder, reminderTest } from './reminder.js';
import { disableNotifications } from './handlers/disableNotifications.handler.js';
import { enableNotifications } from './handlers/enableNotifications.handler.js';
import { updateLastVisit } from './services/userService.js';
import { sequentialize } from './middlewares/sequentialize.js';

dotenv.config();
await connectDB();
reminder();

bot.use(
  sequentialize((ctx) => {
    if (!ctx.chat) return [];
    if (ctx.chat.type === 'private') return [String(ctx.chat.id)];
    if (ctx.from) return [`${ctx.chat.id}:${ctx.from.id}`];
    return [String(ctx.chat.id)];
  })
);

bot.use(updateLastVisit);

//reminderTest();

await bot.api.setMyCommands([
  { command: 'start', description: '🔁 Запустить бота заново' },
  { command: 'add_word', description: '➕ Добавить новые слова' },
  { command: 'train', description: '🧠 Начать тренировку' },
  { command: 'stats', description: '📊 Посмотреть статистику' },
  { command: 'words', description: '📚 Посмотреть список слов' },
  { command: 'enable_notifications', description: '🔔 Включить уведомления' },
]);

bot.command('start', startCommand);
bot.command('add_word', callbackAddWord);
bot.command('train', callbackTrain);
bot.command('stats', callbackStats);
bot.command('words', callbackWords);
bot.command('enable_notifications', enableNotifications);

bot.callbackQuery('stats', async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return callbackStats(ctx);
});

bot.callbackQuery('words', async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return callbackWords(ctx);
});

bot.callbackQuery('menu:back', async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});

  ctx.session.step = null;
  ctx.session.selectedLessonId = null;

  return handleBack(ctx);
});

bot.callbackQuery('disable_notifications', async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return disableNotifications(ctx);
});

bot.callbackQuery(/^level_|^age_/, async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return handleOnboarding(ctx);
});

bot.callbackQuery('reminder_train', async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  ctx.session.step = null;
  return callbackTrain(ctx);
});

bot.callbackQuery('train', async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return callbackTrain(ctx);
});

bot.callbackQuery('choose_lesson', async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return handleShowLessonList(ctx);
});

bot.callbackQuery(/^select_lesson_/, async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return handleSelectLesson(ctx);
});
bot.callbackQuery(/^select_words_lesson_/, async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return handleSelectWords(ctx);
});

bot.callbackQuery(/^select_type_/, async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return handleSelectTrainingType(ctx);
});

bot.callbackQuery(/^train_/, async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return handleTrainCallback(ctx);
});
bot.callbackQuery('add_word', async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return callbackAddWord(ctx);
});
bot.callbackQuery('lessons_page:next', async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return handleNextClick(ctx);
});
bot.callbackQuery('lessons_page:prev', async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  return handlePrevClick(ctx);
});

bot.callbackQuery('start_training', async (ctx) => {
  await ctx.answerCallbackQuery().catch(() => {});
  ctx.session.step = 'training';

  return askNextQuestion(ctx);
});

bot.on('message:text', handleTextMessageRouter);

bot.on('message:photo', (ctx) => {
  console.log(ctx.message.photo);
});

bot.on('message:video', (ctx) => {
  console.log(ctx.message.video);
});

bot.catch((error) => {
  const ctx = error.ctx;
  console.error(`Error with hadling update ${ctx.update.update_id}`);

  const e = error.error;

  if (e instanceof GrammyError) {
    console.error(`Error in request: ${e.description}`);
  } else if (e instanceof HttpError) {
    console.error(`Couldn't contact Telegram: ${e}`);
  } else {
    console.error(`Unexpected error: ${e}`);
  }
});

bot.start();
console.log('🤖 Бот запущен...');
