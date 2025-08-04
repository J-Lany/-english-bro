export async function safeReplyText(ctx, text, keyboard = undefined) {
  const replyOptions = {
    parse_mode: 'HTML',
    ...(keyboard ? { reply_markup: keyboard } : {}),
  };

  if (ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, replyOptions);
    } catch (err) {
      console.warn('⚠️ Не получилось отредактировать текст, fallback на reply');
      await ctx.reply(text, replyOptions);
    }
  } else {
    await ctx.reply(text, replyOptions);
  }
}
