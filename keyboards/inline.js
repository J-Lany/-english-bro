import { InlineKeyboard } from 'grammy';

export const mainMenuKeyboard = new InlineKeyboard()
  .text('➕ Добавить слово', 'add_word')
  .text('📊 Статистика', 'stats')
  .row()
  .text('🧠 Потренироваться', 'train');
