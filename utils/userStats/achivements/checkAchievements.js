import { ACHIEVEMENTS } from './achievements.js';

export function checkAchievements(user, stats) {
  if (!user.achievements) {
    user.achievements = [];
  }

  const newAchievements = [];

  for (const achievement of ACHIEVEMENTS) {
    if (
      !user.achievements.includes(achievement.id) &&
      achievement.check(user, stats)
    ) {
      user.achievements.push(achievement.id);
      newAchievements.push(achievement);
    }
  }

  return newAchievements;
}
