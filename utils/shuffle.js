export const shuffleArray = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export function getShuffledOptions(correctAnswer, incorrectAnswers) {
  const shuffledAnswers = shuffleArray([
    correctAnswer,
    incorrectAnswers[0],
    incorrectAnswers[1],
  ]);

  const symbols = ['🇦', '🇧', '🇨'];

  return symbols.map((symbol, idx) => ({
    symbol,
    text: shuffledAnswers[idx],
  }));
}
