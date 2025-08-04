function normalizeText(str) {
  if (!str) return '';

  return str
    .toLowerCase()
    .trim()
    .replace(/[’‘‛`´]/g, "'")
    .replace(/[–—−]/g, '-')
    .replace(/[\s-]+/g, '')
    .replace(/[.,!?;:"(){}\[\]]/g, '');
}

export function isAnswerCorrect(userAnswer, correctAnswer) {
  console.log('User:', normalizeText(userAnswer));
  console.log('Correct:', normalizeText(correctAnswer));
  console.log('Raw correctAnswer:', correctAnswer);
  return normalizeText(userAnswer) === normalizeText(correctAnswer);
}
