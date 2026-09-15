/**
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function (words) {
    // Morse code of "a".."z" in alphabetical order; a letter's entry sits
    // at charCodeAt(i) - 97.
    const MORSE = [
        ".-",
        "-...",
        "-.-.",
        "-..",
        ".",
        "..-.",
        "--.",
        "....",
        "..",
        ".---",
        "-.-",
        ".-..",
        "--",
        "-.",
        "---",
        ".--.",
        "--.-",
        ".-.",
        "...",
        "-",
        "..-",
        "...-",
        ".--",
        "-..-",
        "-.--",
        "--..",
    ];
    // A word's transformation is its letters' codes joined in order; the
    // set counts distinct results, so equal transformations fold.
    const seen = new Set();
    for (const word of words) {
        let transformation = "";
        for (let i = 0; i < word.length; ++i) {
            transformation += MORSE[word.charCodeAt(i) - 97];
        }
        seen.add(transformation);
    }
    return seen.size;
};
