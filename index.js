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

dotenv.config();
await connectDB();
reminder();
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

bot.callbackQuery('stats', callbackStats);
bot.callbackQuery('words', callbackWords);
bot.callbackQuery('menu:back', handleBack);
bot.callbackQuery('disable_notifications', disableNotifications);
bot.command('enable_notifications', enableNotifications);
bot.callbackQuery(/^level_|^age_/, handleOnboarding);
bot.callbackQuery('reminder_train', async (ctx) => {
  ctx.session.step = null;
  return callbackTrain(ctx);
});
bot.callbackQuery('train', callbackTrain);
bot.callbackQuery('choose_lesson', handleShowLessonList);
bot.callbackQuery(/^select_lesson_/, handleSelectLesson);
bot.callbackQuery(/^select_words_lesson_/, handleSelectWords);
bot.callbackQuery(/^select_type_/, handleSelectTrainingType);
bot.callbackQuery('stats', callbackStats);
bot.callbackQuery(/^train_/, handleTrainCallback);
bot.callbackQuery('add_word', callbackAddWord);
bot.callbackQuery('lessons_page:next', handleNextClick);
bot.callbackQuery('lessons_page:prev', handlePrevClick);

bot.callbackQuery('start_training', async (ctx) => {
  ctx.session.step = 'training';

  await askNextQuestion(ctx);
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
