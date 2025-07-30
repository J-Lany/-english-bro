import { User } from '../models/user.js';

export const saveTrainingResult = async (telegramId, training) => {
  const user = await User.findOne({ telegramId });
  if (!user) return;

  const storedTraining = user.trainings.find(
    (training) => training.date === training.trainingDate
  );

  storedTraining.attempts += 1;

  if (training.correct > storedTraining.correct) {
    storedTraining.correct = training.correct;
  }

  await user.save();
};

export async function setNewTraining(newTraining, user, date) {
  const training = {
    date: date,
    wordIds: user.words.map((word) => word._id),
    questions: newTraining,
    total: newTraining.length,
    correct: 0,
    attempts: 0,
  };

  user.trainings.push(training);
  await user.save;
}
