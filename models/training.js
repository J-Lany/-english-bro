import mongoose from 'mongoose';

export const trainingSchema = new mongoose.Schema({
  date: String,
  wordIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word' }],
  questions: [
    {
      question: String,
      correctAnswer: String,
      incorrectAnswers: [String],
      translation: String,
      examples: [String],
      explanation: String,
      questionType: String,
    },
  ],
  correct: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },

  trainingType: {
    type: String,
    enum: [
      'definition_quiz',
      'gap_filling',
      'phrase_fail',
      'collocation_check',
    ],
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
});
