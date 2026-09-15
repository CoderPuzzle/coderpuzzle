/**
 * @param {string} s
 * @return {number}
 */
var maxLengthBetweenEqualCharacters = function (s) {
    // Only a character's first and last occurrence can bound the widest gap
    // for that character, so a single pass recording first-seen indices is
    // enough.
    const first = new Map();
    let best = -1;
    for (let index = 0; index < s.length; ++index) {
        const c = s[index];
        if (!first.has(c)) {
            first.set(c, index);
        } else {
            best = Math.max(best, index - first.get(c) - 1);
        }
    }
    return best;
};
