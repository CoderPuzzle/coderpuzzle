/**
 * @param {string} s
 * @return {number}
 */
var partitionString = function (s) {
    let count = 1;
    let seen = 0;
    for (const ch of s) {
        const bit = 1 << (ch.charCodeAt(0) - 97);
        if (seen & bit) {
            count++;
            seen = bit;
        } else {
            seen |= bit;
        }
    }
    return count;
};
