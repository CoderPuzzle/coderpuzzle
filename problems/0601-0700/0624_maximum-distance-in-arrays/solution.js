/**
 * @param {number[][]} arrays
 * @return {number}
 */
var maxDistance = function (arrays) {
    // Only each array's first and last elements can sit in an optimal
    // pair, so one sweep holding the smallest first and the largest last
    // of the arrays already seen answers everything. Each new array tries
    // both of its ends against those running extremes — a pairing that
    // always spans two different arrays — and only afterwards folds its
    // own ends in, which keeps the global minimum and maximum from being
    // paired inside a single array.
    let best = 0;
    let lo = arrays[0][0];
    let hi = arrays[0][arrays[0].length - 1];
    for (let i = 1; i < arrays.length; i++) {
        const first = arrays[i][0];
        const last = arrays[i][arrays[i].length - 1];
        best = Math.max(best, Math.abs(first - hi), Math.abs(last - lo));
        lo = Math.min(lo, first);
        hi = Math.max(hi, last);
    }
    return best;
};
