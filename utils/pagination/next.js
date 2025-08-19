import { sendLessonsPage } from '../../handlers/utils/sendLessonsPage.js';

export default async function handleNextClick(ctx) {
  ctx.session.page = (ctx.session.page || 0) + 1;
  await sendLessonsPage(ctx);
}
