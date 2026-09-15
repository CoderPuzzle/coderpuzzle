// The pattern holds under a bijection: each letter names exactly one word,
// and no two letters share a word. Each clause is one map, checked together
// in a single pass over letter/word pairs.
function wordPattern(pattern: string, s: string): boolean {
    const words = s.split(" ");
    if (pattern.length !== words.length) {
        // With counts different, letters and words cannot pair one-to-one.
        return false;
    }
    const letterToWord = new Map<string, string>();
    const wordToLetter = new Map<string, string>();
    for (let index = 0; index < words.length; ++index) {
        const letter = pattern[index];
        const word = words[index];
        // One branch per direction: the letter already names a different
        // word, or the word is already claimed by a different letter.
        const bound = letterToWord.get(letter);
        if (bound !== undefined && bound !== word) return false;
        const owner = wordToLetter.get(word);
        if (owner !== undefined && owner !== letter) return false;
        letterToWord.set(letter, word);
        wordToLetter.set(word, letter);
    }
    return true;
}
