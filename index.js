// index.js
import { Bot, GrammyError, HttpError, session } from 'grammy';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { startCommand } from './handlers/start.handler.js';
import {
  callbackAddWord,
  handleTextMessage,
} from './handlers/addWord.handler.js';
import {
  callbackTrain,
  handleTrainCallback,
} from './handlers/train.handler.js';
import { callbackStats } from './handlers/wordStats.handler.js';

dotenv.config();

await connectDB();

const bot = new Bot(process.env.BOT_API_KEY);

bot.use(session({ initial: () => ({ step: null, temp: {} }) }));

await bot.api.setMyCommands([
  { command: 'start', description: '🔁 Запустить бота заново' },
  { command: 'add_word', description: '➕ Добавить новые слова' },
  { command: 'train', description: '🧠 Начать тренировку' },
  { command: 'stats', description: '📊 Посмотреть список слов' },
]);

bot.command('start', startCommand);
bot.command('add_word', callbackAddWord);
bot.command('train', callbackTrain);
bot.command('stats', callbackStats);

bot.callbackQuery('train', callbackTrain);
bot.callbackQuery('stats', callbackStats);
bot.callbackQuery(/^train_/, handleTrainCallback);
bot.callbackQuery('add_word', callbackAddWord);

bot.on('message:text', handleTextMessage);

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
