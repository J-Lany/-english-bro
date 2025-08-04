import { User } from '../models/user.js';
import { getToday } from '../utils/date.js';

export async function saveLessonWithWords(telegramId, words, name) {
  const user = await User.findOne({ telegramId });
  const today = getToday();

  const lesson = {
    date: today,
    name,
    wordIds: [],
  };

  for (const { en, ru, syn } of words) {
    user.words.push({ en, ru, syn });
    const savedWord = user.words[user.words.length - 1];
    lesson.wordIds.push(savedWord._id);
  }

  user.lessons.push(lesson);
  await user.save();
}
