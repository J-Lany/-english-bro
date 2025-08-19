import { getOrCreateLessonTraining } from '../services/trainingService.js';
import { trainingTypeLabels } from './utils/trainingTypeLabels.js';
import { User } from '../models/user.js';
import { trainingTaskTexts } from '../utils/text/trainingTaskTexts.js';
import { getWordsListForTraining } from './utils/getWordsListForTraining.js';
import { formatDate } from '../utils/date.js';

export const handleShowLessonList = async (ctx) => {
  const user = await User.findOne({ telegramId: ctx.from.id });
  if (!user.lessons.length) {
    return ctx.reply('📭 У тебя пока нет уроков.');
  }

  const buttons = user.lessons.map((lesson) => [
    {
      text: `${lesson.name} (${lesson.date})`,
      callback_data: `select_lesson_${lesson._id}`,
    },
  ]);

  return ctx.reply('📚 Выбери урок:', {
    reply_markup: { inline_keyboard: buttons },
  });
};

export const handleSelectLesson = async (ctx) => {
  const lessonId = ctx.callbackQuery.data.split('_').at(-1);
  ctx.session.selectedLessonId = lessonId;

  const user = await User.findOne({ telegramId: ctx.from.id });
  const lesson = user.lessons.find((l) => l._id.toString() === lessonId);

  if (!lesson) return ctx.reply('❌ Урок не найден.');

  const buttons = Object.entries(trainingTypeLabels).map(([key, label]) => {
    return [{ text: label, callback_data: `select_type_${key}` }];
  });

  return ctx.reply(
    `Get ready to practice the phrases from: ${lesson.name} (${formatDate(lesson.date)})\nWhat will you do?`,
    { reply_markup: { inline_keyboard: buttons } }
  );
};

export const handleSelectTrainingType = async (ctx) => {
  const trainingType = ctx.callbackQuery.data.split('_').slice(2).join('_');
  const lessonId = ctx.session.selectedLessonId;

  if (!lessonId) return ctx.reply('⚠️ Сначала выбери урок.');

  const user = await User.findOne({ telegramId: ctx.from.id });

  const existingTraining = user.trainings.find(
    (t) =>
      t.lessonId?.toString() === lessonId && t.trainingType === trainingType
  );

  if (!existingTraining) {
    await ctx.reply('⏳ Hold on… AI just needs a sec to work its magic! 🧚✨');
  }

  try {
    const training = await getOrCreateLessonTraining({
      user,
      lessonId,
      trainingType,
    });

    ctx.session.step = 'training';
    ctx.session.training = {
      index: 0,
      correct: 0,
      total: training.questions.length,
      questions: training.questions,
      trainingDate: training.date,
      trainingType: training.trainingType,
      lessonId: training.lessonId,
      name: training.name,
      attempts: training.attempts ?? 0,
    };

    let wordsList = '';
    if (
      trainingType === 'gap_filling' ||
      trainingType === 'collocation_check'
    ) {
      wordsList = '\n' + getWordsListForTraining(training.wordIds, user.words);
    }

    const taskText = trainingTaskTexts[trainingType] || 'Training started';

    return ctx.reply(`${taskText}${wordsList}`, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🚀 Let’s go!', callback_data: 'start_training' }],
          [{ text: '↩️ Назад', callback_data: 'train' }],
        ],
      },
    });
  } catch (error) {
    console.log(error);
    ctx.reply(
      'Oops! Our AI’s feeling a bit tired and needs a short break 💤\nPlease try again in a little while 🙏'
    );
  }
};
