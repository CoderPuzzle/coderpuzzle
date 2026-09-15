/**
 * @param {number[]} original
 * @param {number[][]} bounds
 * @return {number}
 */
var countArrays = function (original, bounds) {
    // copy[0] fixes every later entry: copy[i] = copy[0] + original[i] - original[0].
    // Keep the window of admissible copy[0] values by folding each bound in.
    let lo = bounds[0][0];
    let hi = bounds[0][1];
    for (let i = 1; i < original.length; i++) {
        const shift = original[i] - original[0];
        lo = Math.max(lo, bounds[i][0] - shift);
        hi = Math.min(hi, bounds[i][1] - shift);
        if (lo > hi) {
            return 0;
        }
    }
    return hi - lo + 1;
};
