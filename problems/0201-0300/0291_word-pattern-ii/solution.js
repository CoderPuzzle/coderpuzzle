/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPatternMatch = function (pattern, s) {
    // Depth-first walk over pattern positions with a two-way map:
    // forward (char -> word) keeps every later occurrence of the char
    // honest, backward (word -> char) enforces the bijection.
    const charToWord = new Map();
    const wordToChar = new Map();

    const match = (pi, si) => {
        if (pi === pattern.length) {
            // Every char placed: a match only when s is fully consumed.
            return si === s.length;
        }
        if (si === s.length) {
            // Chars remain but s is exhausted; mappings are non-empty.
            return false;
        }
        const letter = pattern[pi];
        if (charToWord.has(letter)) {
            // A char already mapped must reproduce its word exactly.
            const word = charToWord.get(letter);
            return s.startsWith(word, si) && match(pi + 1, si + word.length);
        }
        for (let end = si + 1; end <= s.length; end++) {
            const word = s.slice(si, end);
            // Bijection: the word is already another char's image.
            if (wordToChar.has(word)) continue;
            charToWord.set(letter, word);
            wordToChar.set(word, letter);
            if (match(pi + 1, end)) return true;
            charToWord.delete(letter);
            wordToChar.delete(word);
        }
        return false;
    };

    return match(0, 0);
};
