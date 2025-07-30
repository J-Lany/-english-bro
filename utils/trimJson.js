export function trimJson(input) {
  const startIndex = input.indexOf('[');
  const endIndex = input.lastIndexOf(']');

  if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
    throw new Error('Invalid JSON input');
  }

  const trimmedJson = input.substring(startIndex, endIndex + 1);
  return trimmedJson;
}
