/**
 * @param {string} text
 * @param {string[]} words
 * @return {number[][]}
 */
var indexPairs = function (text, words) {
    const result = [];
    const n = text.length;
    for (let i = 0; i < n; i++) {
        for (const word of words) {
            const end = i + word.length;
            if (end <= n && text.slice(i, end) === word) {
                result.push([i, end - 1]);
            }
        }
    }
    result.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    return result;
};
