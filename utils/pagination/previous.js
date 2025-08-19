import { sendLessonsPage } from '../../handlers/utils/sendLessonsPage.js';

export default async function handlePrevClick(ctx) {
  ctx.session.page = Math.max((ctx.session.page || 0) - 1, 0);
  await sendLessonsPage(ctx);
}
