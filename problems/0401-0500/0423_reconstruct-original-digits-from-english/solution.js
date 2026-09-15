/**
 * @param {string} s
 * @return {string}
 */
var originalDigits = function (s) {
    // Order never matters: the input is a shuffled multiset of letters, so
    // one counting pass fixes every letter count there is to know.
    const counts = {};
    for (const ch of s) {
        counts[ch] = (counts[ch] || 0) + 1;
    }
    // z, w, u, x and g each occur in exactly one digit word, so they peel
    // off 0, 2, 4, 6 and 8 with no bookkeeping at all.
    const digits = new Array(10).fill(0);
    digits[0] = counts.z || 0;
    digits[2] = counts.w || 0;
    digits[4] = counts.u || 0;
    digits[6] = counts.x || 0;
    digits[8] = counts.g || 0;
    // h, f and s are each shared with exactly one already-known digit — 8,
    // 4 and 6 respectively — so subtracting those yields 3, 5, 7.
    digits[3] = (counts.h || 0) - digits[8];
    digits[5] = (counts.f || 0) - digits[4];
    digits[7] = (counts.s || 0) - digits[6];
    // o is shared with 0, 2 and 4; i with 5, 6 and 8. n is never consulted:
    // "nine" holds two of them against one apiece in "one" and "seven",
    // while its single i settles the count cleanly.
    digits[1] = (counts.o || 0) - digits[0] - digits[2] - digits[4];
    digits[9] = (counts.i || 0) - digits[5] - digits[6] - digits[8];
    // Ascending digits, each repeated as often as it was spelled.
    const parts = [];
    for (let d = 0; d < 10; ++d) {
        parts.push(String(d).repeat(digits[d]));
    }
    return parts.join("");
};
