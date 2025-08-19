export function trimJson(input) {
  try {
    const startIndex = input.indexOf('[');
    const endIndex = input.lastIndexOf(']');

    if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
      throw new Error();
    }

    const trimmedJson = input.substring(startIndex, endIndex + 1);
    return trimmedJson;
  } catch {
    throw new Error('Invalid JSON input');
  }
}
