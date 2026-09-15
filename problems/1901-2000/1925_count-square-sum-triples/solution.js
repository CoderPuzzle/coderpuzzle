/**
 * @param {number} n
 * @return {number}
 */
var countTriples = function (n) {
    // Each ordered pair (a, b) contributes one triple iff a^2 + b^2 is a
    // perfect square c^2 with c <= n. Rounding sqrt and re-squaring keeps
    // the check on the integer side, immune to float drift.
    let count = 0;
    for (let a = 1; a <= n; a++) {
        for (let b = 1; b <= n; b++) {
            const s = a * a + b * b;
            const r = Math.round(Math.sqrt(s));
            if (r <= n && r * r === s) {
                count++;
            }
        }
    }
    return count;
};
