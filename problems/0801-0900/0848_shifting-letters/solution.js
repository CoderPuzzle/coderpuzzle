/**
 * @param {string} s
 * @param {number[]} shifts
 * @return {string}
 */
var shiftingLetters = function (s, shifts) {
    // Letter i is advanced once by every shifts[j] with j >= i, so its total
    // shift is the suffix sum shifts[i..n-1] — one running total on a
    // right-to-left scan replaces all the prefix operations.
    const out = [];
    // 10^5 shifts of 10^9 sum to 10^14, far below 2^53, so every total stays
    // exact as a number.
    let total = 0;
    for (let i = s.length - 1; i >= 0; --i) {
        total += shifts[i];
        // Shifts are non-negative, so % 26 lands the wrap z -> a exactly.
        out.push(String.fromCharCode(97 + ((s.charCodeAt(i) - 97 + total) % 26)));
    }
    return out.reverse().join("");
};
