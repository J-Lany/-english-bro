import { User } from '../models/user.js';
import { getToday } from '../utils/date.js';

export async function setNewWords(words, telegramId) {
  const user = await User.findOne({ telegramId });
  const today = getToday();

  let lesson = user.lessons.find((l) => l.date === today);
  if (!lesson) {
    lesson = { date: today, wordIds: [] };
    user.lessons.push(lesson);
  }

  for (const { en, ru } of words) {
    user.words.push({ en, ru });
    const last = user.words[user.words.length - 1];
    lesson.wordIds.push(last._id);
  }

  await user.save();
}
