import { Bot, session } from 'grammy';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Bot(process.env.BOT_API_KEY);

bot.use(
  session({
    initial: () => ({
      step: null,
      training: null,
      selectedLessonId: null,
      lessonsContext: null,
      page: 0,
      temp: {},
    }),
    getSessionKey: (ctx) => {
      if (!ctx.chat) return undefined;
      if (ctx.chat.type === 'private') return String(ctx.chat.id);
      if (ctx.from) return `${ctx.chat.id}:${ctx.from.id}`;
      return String(ctx.chat.id);
    },
  })
);
export default bot;
