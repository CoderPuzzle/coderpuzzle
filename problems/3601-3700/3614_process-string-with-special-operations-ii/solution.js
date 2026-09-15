/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var processStr = function (s, k) {
    // First pass: the length of the result after each prefix. '#' doubles
    // it, '*' drops one (never below zero), a letter adds one, '%' leaves
    // it untouched. The result is capped at 10^15 characters < 2^53, so
    // plain-number arithmetic stays exact and no string is ever built.
    const length = new Array(s.length + 1).fill(0);
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (ch === "*") length[i + 1] = Math.max(0, length[i] - 1);
        else if (ch === "#") length[i + 1] = length[i] * 2;
        else if (ch === "%") length[i + 1] = length[i];
        else length[i + 1] = length[i] + 1;
    }
    if (k >= length[s.length]) return ".";
    // Walk backwards, undoing each operation to map position k of the final
    // string back to the letter that produced it. The length array pins down
    // where each duplication and reversal boundary sits, so every step is
    // arithmetic, not string work.
    let pos = k;
    for (let i = s.length - 1; i >= 0; i--) {
        const ch = s[i];
        if (ch === "*") {
            // Removing the tail keeps every earlier position.
        } else if (ch === "#") {
            const half = length[i];
            if (pos >= half) pos -= half;
        } else if (ch === "%") {
            pos = length[i] - 1 - pos;
        } else if (pos === length[i]) {
            return ch;
        }
    }
    return ".";
};
