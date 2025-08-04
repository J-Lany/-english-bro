import { User } from '../models/user.js';

export const createUserWithProfile = async ({
  telegramId,
  level,
  ageGroup,
}) => {
  return User.create({
    telegramId,
    level,
    ageGroup,
    words: [],
    lessons: [],
  });
};

export async function updateLastVisit(ctx, next) {
  if (ctx.from?.id) {
    await User.findOneAndUpdate(
      { telegramId: ctx.from.id },
      { lastVisit: new Date() }
    );
  }
  return next();
}
