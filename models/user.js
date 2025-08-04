import mongoose from 'mongoose';
import { lessonSchema, wordSchema } from './lessons.js';
import { trainingSchema } from './training.js';

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  lastVisit: { type: Date, default: Date.now },
  notificationsEnabled: { type: Boolean, default: true },
  lastNotificationSent: { type: Date, default: null },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  ageGroup: {
    type: String,
    enum: ['child', 'teen', 'adult'],
    default: 'adult',
  },
  words: [wordSchema],
  lessons: [lessonSchema],
  trainings: [trainingSchema],
  achievements: { type: [String], default: [] },
});

export const User = mongoose.model('User', userSchema);
