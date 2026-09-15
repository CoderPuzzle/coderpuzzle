/**
 * @param {string} word
 * @param {string} ch
 * @return {string}
 */
var reversePrefix = function (word, ch) {
    // Find the first occurrence of ch; if it is absent the word is
    // returned unchanged. Otherwise flip word[0..i] and keep the rest
    // of the string in order.
    const i = word.indexOf(ch);
    if (i === -1) return word;
    const prefix = word.slice(0, i + 1);
    return prefix.split("").reverse().join("") + word.slice(i + 1);
};
