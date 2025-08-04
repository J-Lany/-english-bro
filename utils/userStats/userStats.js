export const TITLES = [
  '🌱 Новичок',
  '📘 Ученик',
  '🧭 Исследователь',
  '⚔️ Мастер',
  '🧘 Гуру',
  '🏆 Легенда',
  '🌌 Бессмертный',
];

export function getUserLevelInfo(user) {
  if (!user) return null;

  const passedTrainings = user.trainings.filter((t) => t.attempts > 0);

  const trainingsCount = passedTrainings.length;
  const level = Math.floor(trainingsCount / 4) + 1;
  const trainingsInLevel = trainingsCount % 4;
  const trainingsToNext = 4 - trainingsInLevel;

  const titleIndex = Math.floor((level - 1) / 10);
  const title = TITLES[Math.min(titleIndex, TITLES.length - 1)];
  const levelUp = trainingsToNext === 4 ? { level, title } : null;

  const startIdx = (level - 1) * 4;
  const endIdx = startIdx + 4;

  const trainingsThisLevel = passedTrainings.slice(startIdx, endIdx);

  let totalCorrect = 0;
  let totalAnswers = 0;

  for (const t of trainingsThisLevel) {
    totalCorrect += t.correct || 0;
    totalAnswers += t.total || 0;
  }

  const accuracy =
    totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;

  return {
    level,
    title,
    trainingsCount,
    trainingsInLevel,
    trainingsToNext,
    accuracy,
    levelUp,
  };
}
