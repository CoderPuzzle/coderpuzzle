/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var minSteps = function (s, t) {
    // The answer is the per-letter deficit of t relative to s; each
    // replacement clears one unit, and deficits equal surpluses.
    const counts = new Array(26).fill(0);
    for (const ch of s) ++counts[ch.charCodeAt(0) - 97];
    for (const ch of t) --counts[ch.charCodeAt(0) - 97];
    let steps = 0;
    for (const delta of counts) {
        if (delta < 0) steps -= delta;
    }
    return steps;
};
