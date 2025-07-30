import mongoose from 'mongoose';
import { lessonSchema, wordSchema } from './lessons.js';
import { trainingSchema } from './training.js';

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  words: [wordSchema],
  lessons: [lessonSchema],
  trainings: [trainingSchema],
});

export const User = mongoose.model('User', userSchema);
