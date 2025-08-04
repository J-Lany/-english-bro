export function pluralizeTrainings(count) {
  const absCount = Math.abs(count) % 100;
  const lastDigit = absCount % 10;

  if (absCount > 10 && absCount < 20) {
    return 'тренировок';
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return 'тренировки';
  }
  if (lastDigit === 1) {
    return 'тренировка';
  }
  return 'тренировок';
}
