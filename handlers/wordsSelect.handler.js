import { User } from '../models/user.js';
import { getWordsListForTraining } from './utils/getWordsListForTraining.js';
import { InlineKeyboard } from 'grammy';
import { formatDate } from '../utils/date.js';

export const handleSelectWords = async (ctx) => {
  const lessonId = ctx.callbackQuery.data.split('_').at(-1);
  ctx.session.selectedLessonId = lessonId;

  const user = await User.findOne({ telegramId: ctx.from.id });
  const lesson = user.lessons.find((l) => l._id.toString() === lessonId);

  if (!lesson) return ctx.reply('❌ Урок не найден.');

  const wordsList = getWordsListForTraining(lesson.wordIds, user.words);

  const keyboard = new InlineKeyboard()
    .text('➕ Добавить слова', 'add_word')
    .row()
    .text('🧠 Потренироваться', 'train')
    .text('📊 Статистика', 'stats')
    .row()
    .text('🔙 Назад', 'words');

  return ctx.reply(
    `Repeat the phrases from:\n${lesson.name} (${formatDate(lesson.date)})\n\n${wordsList}\n\n`,
    { parse_mode: 'HTML', reply_markup: keyboard }
  );
};
