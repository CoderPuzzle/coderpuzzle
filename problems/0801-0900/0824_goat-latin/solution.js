/**
 * @param {string} sentence
 * @return {string}
 */
var toGoatLatin = function (sentence) {
    // One pass over the words. Each word is reshaped by its first letter
    // alone: a vowel-initial word survives intact, a consonant-initial
    // word rotates its first letter to the end. Every word then takes
    // "ma" plus one more 'a' per its 1-based index, so the i-th word
    // ends in exactly i 'a's. The vowel test is case-blind: 'I' opens
    // the first example as a vowel.
    const vowels = new Set("aeiouAEIOU");
    const words = [];
    const parts = sentence.split(" ");
    for (let i = 0; i < parts.length; i++) {
        let word = parts[i];
        if (!vowels.has(word[0])) {
            word = word.slice(1) + word[0];
        }
        words.push(word + "ma" + "a".repeat(i + 1));
    }
    return words.join(" ");
};
