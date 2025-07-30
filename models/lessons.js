import mongoose from 'mongoose';

export const wordSchema = new mongoose.Schema({
  en: String,
  ru: String,
});

export const lessonSchema = new mongoose.Schema({
  date: String,
  wordIds: [{ type: mongoose.Schema.Types.ObjectId }],
});
