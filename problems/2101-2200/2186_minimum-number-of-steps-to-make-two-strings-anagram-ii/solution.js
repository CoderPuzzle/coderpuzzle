/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var minSteps = function (s, t) {
    // Order is irrelevant; only letter counts matter. The answer is the
    // total absolute per-letter frequency difference.
    const counts = new Array(26).fill(0);
    for (const ch of s) {
        ++counts[ch.charCodeAt(0) - 97];
    }
    for (const ch of t) {
        --counts[ch.charCodeAt(0) - 97];
    }
    let total = 0;
    for (const diff of counts) {
        total += Math.abs(diff);
    }
    return total;
};
