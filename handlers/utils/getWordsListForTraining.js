export function getWordsListForTraining(trainingWordIds, userWords) {
  const wordIdStrings = trainingWordIds.map((id) => {
    return typeof id.toHexString === 'function'
      ? id.toHexString()
      : id.toString();
  });

  const wordMap = new Map(
    userWords.map((w) => [
      typeof w._id.toHexString === 'function'
        ? w._id.toHexString()
        : w._id.toString(),
      w,
    ])
  );

  const words = wordIdStrings
    .map((idStr) => wordMap.get(idStr))
    .filter(Boolean)
    .map((w) => {
      if (w.syn) {
        return `<b>${w.en}</b> — ${w.ru} (${w.syn})`;
      } else {
        return `<b>${w.en}</b> — ${w.ru}`;
      }
    });
  if (words.length) {
    return `The list of words:\n<blockquote>${words.join('\n')}</blockquote>\n\n`;
  }
  return '';
}
