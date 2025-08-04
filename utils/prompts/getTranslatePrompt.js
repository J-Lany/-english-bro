export function getTranslatePrompt(words) {
  return `You are given a list of English phrases that need to be prepared for English learners. 
   For each phrase: 1. Correct spelling if needed. 2. Provide the most accurate Russian translation (the standard dictionary equivalent, or a natural idiomatic translation if the phrase is an idiom).
   Do NOT translate word-for-word if the phrase is idiomatic. 3. Add ONE very simple English synonym ONLY IF there is a clear, natural synonym (not an explanation or definition). The synonym must be simpler than the original phrase. 
   If no such synonym exists, leave this field as an empty string "".
     The answer must be in JSON format as an array of objects, where each object contains:  - "en" (English phrase), - "ru" (Russian translation), - "syn" (simplified synonym or "" if none).
     Do not add comments or extra characters.  Do not explain meanings. 
    Do not output arrays for synonyms, only a single string.  Example input phrase: "go out" Example JSON output: [   {     "en": "go out",     "ru": "выходить",     "syn": "leave"   } 
   ]  Now process the following list of target phrases: 
  ${words.map((w) => `- ${w}`).join('\n')} `;
}
