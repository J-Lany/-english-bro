export function buildAnswerFeedback({
  isCorrect,
  correctAnswer,
  explanation,
  translation,
  examples,
  trainingType,
}) {
  let feedback = isCorrect ? '✅ Well done!' : '❌ Oops! Incorrect';

  if (isCorrect && trainingType === 'collocation_check') {
    feedback += `\n🌍 Russian translation:\n${translation}`;
  }

  if (!isCorrect) {
    feedback += `\n✔️ Here's the right answer: ${correctAnswer}`;

    if (explanation) {
      feedback += `\n💡 Explanation: ${explanation}`;
    }

    if (translation) {
      feedback += `\n🌍 Russian translation:\n${translation}`;
    }

    if (examples?.length) {
      const shownExamples = examples.slice(0, 2);
      feedback += `\n📚 Examples:\n- ${shownExamples.join('\n- ')}`;
    }
  }

  return feedback;
}
