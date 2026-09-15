/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
    // Interleaved list-doubling: scan s left to right; at each letter
    // every string built so far is immediately followed by its copy with
    // that one letter's case flipped.
    let result = [s];
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        const letter = (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
        if (!letter) {
            continue;
        }
        const flipped = String.fromCharCode(ch.charCodeAt(0) ^ 0x20);
        const grown = [];
        for (const current of result) {
            grown.push(current, current.slice(0, i) + flipped + current.slice(i + 1));
        }
        result = grown;
    }
    return result;
};
