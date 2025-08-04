import { generateTraining } from '../handlers/utils/generateTraining.js';
import { getToday } from '../utils/date.js';
import { trainingTypeLabels } from '../handlers/utils/trainingTypeLabels.js';
import { User } from '../models/user.js';
import { getUserLevelInfo } from '../utils/userStats/userStats.js';
import { checkAchievements } from '../utils/userStats/achivements/checkAchievements.js';

export async function setNewTraining(
  newTraining,
  user,
  date,
  trainingType,
  name,
  lessonId,
  words
) {
  const training = {
    date,
    wordIds: words.map((w) => w._id),
    questions: newTraining,
    total: newTraining.length,
    correct: 0,
    attempts: 0,
    trainingType,
    name,
    lessonId,
  };

  user.trainings.push(training);
  await user.save();

  return user.trainings[user.trainings.length - 1];
}

export const getOrCreateLessonTraining = async ({
  user,
  lessonId,
  trainingType,
}) => {
  const existingTraining = user.trainings.find(
    (t) =>
      t.lessonId?.toString() === lessonId && t.trainingType === trainingType
  );

  if (existingTraining) {
    return existingTraining;
  }

  const lesson = user.lessons.find((l) => l._id.toString() === lessonId);
  if (!lesson) throw new Error('Lesson not found');

  const words = user.words.filter((w) =>
    lesson.wordIds.some((id) => id.toString() === w._id.toString())
  );

  const generatedTraining = await generateTraining({
    words,
    level: user.level,
    ageGroup: user.ageGroup,
    trainingType,
  });

  const name = `${lesson.name} (${lesson.date}) - ${trainingTypeLabels[trainingType]}`;

  const savedTraining = await setNewTraining(
    generatedTraining,
    user,
    getToday(),
    trainingType,
    name,
    lessonId,
    words
  );

  return savedTraining;
};

export async function saveTrainingResult(telegramId, sessionTraining) {
  const user = await User.findOne({ telegramId });

  if (!user) return;

  const training = user.trainings.find(
    (t) =>
      t.date === sessionTraining.trainingDate &&
      t.trainingType === sessionTraining.trainingType &&
      (t.lessonId?.toString?.() === sessionTraining.lessonId?.toString?.() ||
        (!t.lessonId && !sessionTraining.lessonId))
  );

  if (!training) {
    console.warn('⚠️ Тренировка не найдена для обновления');
    return;
  }

  training.correct = sessionTraining.correct;
  training.total = sessionTraining.total;
  training.attempts += 1;

  const stats = getUserLevelInfo(user);
  const newAchievements = checkAchievements(user, stats);

  await user.save();

  return { newAchievements, levelUp: stats.levelUp };
}
