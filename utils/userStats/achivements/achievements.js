export const ACHIEVEMENTS = [
  {
    id: 'first_training',
    name: 'Первый шаг',
    description: 'Пройди свою первую тренировку',
    check: (user, stats) => stats.trainingsCount >= 1,
  },
  {
    id: 'ten_trainings',
    name: 'Упорный студент',
    description: 'Пройди 10 тренировок',
    check: (user, stats) => stats.trainingsCount >= 10,
  },
  {
    id: 'fifty_trainings',
    name: 'Трудяга',
    description: 'Пройди 50 тренировок',
    check: (user, stats) => stats.trainingsCount >= 50,
  },
  {
    id: 'hundred_trainings',
    name: 'Железная воля',
    description: 'Пройди 100 тренировок',
    check: (user, stats) => stats.trainingsCount >= 100,
  },
  {
    id: 'level_5',
    name: 'Ученик',
    description: 'Достигни 5 уровня',
    check: (user, stats) => stats.level >= 5,
  },
  {
    id: 'level_10',
    name: 'Путь мастера',
    description: 'Достигни 10 уровня',
    check: (user, stats) => stats.level >= 10,
  },
  {
    id: 'level_20',
    name: 'Грандмастер',
    description: 'Достигни 20 уровня',
    check: (user, stats) => stats.level >= 20,
  },
  {
    id: 'accuracy_80',
    name: 'Меткий ученик',
    description: 'Добейся точности 80% на уровне',
    check: (user, stats) => stats.accuracy >= 80 && stats.trainingsInLevel > 0,
  },
  {
    id: 'accuracy_90',
    name: 'Меткий стрелок',
    description: 'Добейся точности 90% на уровне',
    check: (user, stats) => stats.accuracy >= 90 && stats.trainingsInLevel > 0,
  },
  {
    id: 'accuracy_100',
    name: 'Безупречный',
    description: 'Пройди уровень без единой ошибки',
    check: (user, stats) =>
      stats.accuracy === 100 && stats.trainingsInLevel > 0,
  },
];
