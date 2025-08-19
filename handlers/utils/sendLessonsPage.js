import { User } from '../../models/user.js';
import { InlineKeyboard } from 'grammy';
import { safeReplyText } from '../../utils/safe-replies.js';
import { formatDate } from '../../utils/date.js';

const PAGE_SIZE = 4;

export async function sendLessonsPage(ctx, command, pageText) {
  const page = ctx.session.page || 0;

  const user = await User.findOne({ telegramId: ctx.from.id });

  if (!user.lessons.length) {
    return ctx.reply('📭 У тебя пока нет уроков.');
  }

  if (!command || !pageText) {
    const saved = ctx.session.lessonsContext || {};
    command = command || saved.command;
    pageText = pageText || saved.pageText || '📚 Список уроков:';
  }

  const allLessons = [...user.lessons].reverse();

  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageLessons = allLessons.slice(start, end);

  const kb = new InlineKeyboard();

  pageLessons.forEach((lesson) => {
    kb.text(
      `${lesson.name} (${formatDate(lesson.date)})`,
      `${command}_${lesson._id}`
    ).row();
  });

  if (page > 0) kb.text('← ', 'lessons_page:prev');
  if (end < allLessons.length) kb.text(' →', 'lessons_page:next');

  kb.row().text('🔙 В главное меню', 'menu:back');

  return safeReplyText(ctx, pageText, kb);
}
