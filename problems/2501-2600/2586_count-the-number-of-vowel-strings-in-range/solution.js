/**
 * @param {string[]} words
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var vowelStrings = function (words, left, right) {
    // A word counts exactly when both endpoints are vowels; the vowel set
    // keeps each endpoint check constant time.
    const vowels = new Set(["a", "e", "i", "o", "u"]);
    let count = 0;
    for (let i = left; i <= right; ++i) {
        const word = words[i];
        if (vowels.has(word[0]) && vowels.has(word[word.length - 1])) count++;
    }
    return count;
};
