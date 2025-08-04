export const trainingPrompts = {
  beginner: {
    child:
      'I am child and a beginner-level student of English. I only understand simple, short sentences. You are my trainer. Create all the further tasks in this session using simple and clear language for kids. Choose the topics which are relevant and interesting for kids. ',
    teen: 'I am a teenager and a beginner-level student of English. I only understand simple, short sentences. You are my trainer. Create all the further tasks in this session using simple and clear language. Choose the topics which are relevant and interesting for teenagers. ',
    adult:
      'I am an adult and a beginner-level student of English. I only understand simple, short sentences. You are my trainer. Create all the further tasks in this session using simple and clear language. Choose the topics which are relevant and interesting for adults. ',
  },
  intermediate: {
    child:
      'I am a child and an intermediate-level student of English. I do not understand sophisticated language. You are my trainer. Create all the further tasks in this session using words and phrases of intermediate level and clear language appropriate for kids. Choose the topics which are relevant and interesting for kids. ',
    teen: 'I am a teenager and an intermediate-level student of English. I do not understand sophisticated language. You are my trainer. Create all the further tasks in this session using words and phrases of intermediate level, modern and clear English language. Choose the topics which are relevant and interesting for teenagers. ',
    adult:
      'I am an adult and an intermediate-level student of English. I do not understand sophisticated language. You are my trainer. Create all the further tasks in this session using words and phrases of intermediate level, modern and clear English language. Choose the topics which are relevant and interesting for adults. ',
  },
  advanced: {
    child:
      'I am a child and an advanced-level student of English.  You are my trainer. Create all the further tasks in this session using diverse and clear language appropriate for kids. Choose the topics which are relevant and interesting for kids. ',
    teen: 'I am a teenager and an advanced-level student of English.  You are my trainer. Create all the further tasks in this session using diverse, sophisticated, modern and clear language. Choose the topics which are relevant and interesting for teenagers. ',
    adult:
      'I am an adult and an advanced-level student of English.  You are my trainer. Create all the further tasks in this session using diverse, sophisticated, modern and clear language. Choose the topics which are relevant and interesting for adults. ',
  },
};

export const trainingTypePrompts = {
  definition_quiz: `Generate 3 simple, clear and short definitions for each target phrase from the provided list. Only one definition is correct, two definitions are incorrect.

The output must be a strictly valid JSON array (suitable for JSON.parse()). Each element must have the following structure:

{
  "question": "The target phrase",
  "correctAnswer": "The correct definition.",
  "incorrectAnswers": ["Incorrect definition 1", "Incorrect definition 2"]
}

Rules:
- Definitions must be short and learner-friendly (especially for beginners).
- Do not include comments, explanations, or extra text outside the JSON.`,

  gap_filling: `Create a gap-filling exercise. Generate one sentence for each target phrase from the list. 

Rules for gapping:
- If the target phrase contains prepositions or particles (e.g., "marked by", "isolate myself in"), show the preposition/particle in the sentence, and gap only the core part of the phrase (e.g., "_____ by", "_____ in").
- If the phrase contains a placeholder word such as "something", "someone", "somewhere", etc., replace it with a natural and semantically appropriate word or phrase that fits the sentence (e.g., "eat something" → "eat an apple").
- In the "question" field, gap only the core phrase (not the prepositions/particles).
- In the "correctAnswer" field, include only the gapped core phrase (without the placeholder, but also without duplicating prepositions/particles).

The output must be a strictly valid JSON array (suitable for JSON.parse()). Each element must have the following structure:

{
  "question": "Sentence with the gap",
  "correctAnswer": "The gapped core phrase only",
  "explanation": "Short, simple explanation of the meaning and usage."
}

Additional requirements:
- Only one sentence per target phrase.
- Sentences must sound natural and provide enough context.
- Explanations must be short and clear.
- Do not include comments, notes, or extra characters outside the JSON.`,

  phrase_fail: `Generate 3 sentences with each target phrase from the provided list: 2 sentences must use the phrase correctly, and 1 must use it incorrectly. All sentences must be grammatically correct, but in the incorrect one the phrase must be used in an unnatural or illogical way (wrong context/meaning).

The output must be a strictly valid JSON array (suitable for JSON.parse()). Each element must have the following structure:

{
  "question": "Three sentences with the target phrase, separated by line breaks (\\n).",
  "correctAnswer": "The incorrect sentence (copied exactly as in 'question').",
  "incorrectAnswers": ["The two correct sentences (copied exactly as in 'question')."],
  "explanation": "Short explanation why the 'correctAnswer' is wrong and what the phrase really means."
}

Rules:
- Do not number the sentences in 'question' (just separate them with line breaks).
- All sentences must be grammatical; the mistake is semantic, not grammatical.
- Do not include comments, notes, or extra characters outside the JSON.`,

  collocation_check: `You are a collocation generator.  You receive a list of target phrases. For each target phrase, generate exactly 4 of the most common collocations with it.
   Instructions for output: - Always replace the target phrase with the gap "____" in the 'question' field.  - Collocations must be short phrases only (not sentences). 
  - Output must be strictly valid JSON (parsable by JSON.parse) with no text before or after the array.  - Each element in the JSON array must have this structure:  {   "question": "4 collocations in one block of text, numbered 1–4 and separated by the newline character '\\n'. Example: '1. ____ a decision\\n2. ____ a living\\n3. ____ progress\\n4. ____ a sandwich'",   "correctAnswer": "The target phrase (without placeholders like 'something', 'someone', 'somewhere', 'somebody', 'somehow', etc.)",   "translation": "The Russian translations of the 4 collocations, with the gap filled by natural words, numbered 1–4 and separated by the newline character '\\n'." }  Special rules for placeholders: - If the target phrase contains 'something', 'someone', 'somebody', 'somewhere', 'somehow', etc., then:    • In 'question': replace the placeholder with natural, semantically appropriate words (e.g., '____ an apple', not '____ something').    • In 'translation': provide Russian translations of those full collocations (with the natural words, not the placeholder).  Strict rules: Format: The output must be a strictly valid JSON array and nothing else. No text, no explanations, no comments, no markdown, no extra keys. The output must be directly parsable with JSON.parse().
Structure: Every element of the JSON array must contain exactly these three keys:
"question"
"correctAnswer"
"translation"  (No other fields are allowed.)
question field:
Must contain exactly 4 collocations with the target phrase replaced by the gap ____.
They must be numbered 1–4, each on a new line, separated by the newline character \n.
Collocations must be short phrases only, not full sentences.
If the target phrase is longer than 3 words or is an idiom - extract the main part of it to use as the target phrase. For example: initial target phrase "go down the rabbit hole", generated collocations:  1. fall down ____ 2.  be stuck in _____ 3. get lost in ____  4. political ____. Answer: "rabbit hole".
correctAnswer field:
Must contain only the target phrase itself (without placeholders like “something”, “someone”, etc.) which is used in the gap to form the correct collocations.
translation field:
Must contain the Russian translations of the exact same 4 collocations from "question".
Translations must have the gap naturally filled with appropriate words (not placeholders).
Must also be numbered 1–4, each on a new line, separated by the newline character \n.
Consistency: Each collocation in "question" must correspond 1-to-1 with its translation in "translation". No rephrasing or reordering is allowed.
Collocations: Must be real, natural, widely used word combinations — not invented or overly niche expressions.
`,
};
