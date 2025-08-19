export async function safeReplyText(ctx, text, keyboard = undefined) {
  if (!text || !text.trim()) {
    text = '⚠️ Сообщение отсутствует.';
  }

  const replyOptions = {
    parse_mode: 'HTML',
    ...(keyboard ? { reply_markup: keyboard } : {}),
  };

  if (ctx.callbackQuery?.message) {
    if (ctx.callbackQuery.message.video || ctx.callbackQuery.message.photo) {
      return ctx.reply(text, replyOptions);
    }

    try {
      return ctx.editMessageText(text, replyOptions);
    } catch (err) {
      console.warn('⚠️ Не получилось отредактировать текст, fallback на reply');
      return ctx.reply(text, replyOptions);
    }
  } else {
    return ctx.reply(text, replyOptions);
  }
}
