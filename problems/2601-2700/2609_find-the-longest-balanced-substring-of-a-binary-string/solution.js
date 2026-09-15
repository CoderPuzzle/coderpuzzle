/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestBalancedSubstring = function (s) {
    // One pass with two run counters: `zeros` is the length of the zero
    // block currently ending (reset when a fresh block starts after ones),
    // `ones` is the running tail of consecutive ones. A balanced substring
    // is always a prefix-tail pairing min(zeros, ones) of both, so every
    // one seen offers 2 * min as a candidate answer.
    let best = 0;
    let zeros = 0;
    let ones = 0;
    let prev = "";
    for (const ch of s) {
        if (ch === "0") {
            zeros = prev === "0" ? zeros + 1 : 1;
            ones = 0;
        } else {
            ones++;
            const cand = 2 * Math.min(zeros, ones);
            if (cand > best) best = cand;
        }
        prev = ch;
    }
    return best;
};
