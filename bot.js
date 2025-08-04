import { Bot, session } from 'grammy';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Bot(process.env.BOT_API_KEY);
bot.use(session({ initial: () => ({ step: null, temp: {} }) }));

export default bot;
