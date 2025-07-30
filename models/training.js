import mongoose from 'mongoose';

export const trainingSchema = new mongoose.Schema({
  date: String,
  wordIds: [{ type: mongoose.Schema.Types.ObjectId }],
  questions: [
    {
      question: String,
      correctAnswer: String,
      incorrectAnswers: [String],
      questionType: String,
    },
  ],
  correct: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
});
