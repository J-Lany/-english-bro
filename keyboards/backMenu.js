import { InlineKeyboard } from 'grammy';

export const backMenu = new InlineKeyboard()
  .text('➕ Добавить слова', 'add_word')
  .row()
  .text('🧠 Потренироваться', 'train')
  .text('📊 Статистика', 'stats')
  .row()
  .text('📚 Посмотреть список слов', 'words');
