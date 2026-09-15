/**
 * @param {number} n
 * @return {number}
 */
var minimumFlips = function (n) {
    // The binary form without leading zeros.
    const s = n.toString(2);
    // Walk inward from both ends. When the two bits of a pair differ, each
    // end sits on a position whose required bit is the opposite end's bit,
    // so the pair pays exactly two flips.
    let flips = 0;
    for (let left = 0, right = s.length - 1; left < right; left++, right--) {
        if (s[left] !== s[right]) {
            flips += 2;
        }
    }
    return flips;
};
