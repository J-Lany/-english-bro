import { trainingPrompts, trainingTypePrompts } from './trainingPrompts.js';

export function getTrainingPrompt({ level, ageGroup, trainingType }) {
  const promptForLevel = trainingPrompts?.[level]?.[ageGroup];
  const promptForType = trainingTypePrompts?.[trainingType];

  if (!promptForLevel || !promptForType) {
    throw new Error(
      'Invalid level, ageGroup, or trainingType in prompt generation'
    );
  }

  return `${promptForLevel}\n\n${promptForType}`;
}
