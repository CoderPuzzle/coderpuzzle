/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    // Walk in from the right: trailing spaces belong to no word, so skip
    // them, then count letters until a space or the start of the string.
    let i = s.length - 1;
    while (i >= 0 && s[i] === " ") {
        --i;
    }
    const end = i;
    while (i >= 0 && s[i] !== " ") {
        --i;
    }
    return end - i;
};
