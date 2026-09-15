/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
var findOcurrences = function (text, first, second) {
    const words = text.split(" ");
    const thirds = [];
    // Bounding at words.length - 2 guarantees words[i + 2] always exists,
    // so a bigram landing on the last two words is never inspected.
    for (let i = 0; i + 2 < words.length; ++i) {
        if (words[i] === first && words[i + 1] === second) {
            thirds.push(words[i + 2]);
        }
    }
    return thirds;
};
