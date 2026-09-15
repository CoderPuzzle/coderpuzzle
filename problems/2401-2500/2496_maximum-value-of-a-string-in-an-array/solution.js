/**
 * @param {string[]} strs
 * @return {number}
 */
var maximumValue = function (strs) {
    // Digits-only strings count as their base-10 numeric value; everything
    // else counts by length. The numeric value is at most 999999999, far
    // below Number's exact range.
    let best = 0;
    for (const s of strs) {
        const value = /^\d+$/.test(s) ? Number(s) : s.length;
        if (value > best) {
            best = value;
        }
    }
    return best;
};
