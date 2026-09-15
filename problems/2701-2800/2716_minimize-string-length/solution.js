/**
 * @param {string} s
 * @return {number}
 */
var minimizedStringLength = function (s) {
    const seen = new Array(26).fill(false);
    for (const ch of s) {
        seen[ch.charCodeAt(0) - 97] = true;
    }
    let count = 0;
    for (const present of seen) {
        if (present) {
            count++;
        }
    }
    return count;
};
