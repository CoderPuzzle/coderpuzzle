/**
 * @param {number[][]} mat
 * @param {number} target
 * @return {number}
 */
var minimizeTheDifference = function (mat, target) {
    // Reachable sums as a BigInt bitset: bit s is set iff sum s can be
    // formed after the rows processed so far. Each row folds in by shifting.
    let bits = 1n;
    for (const row of mat) {
        let folded = 0n;
        for (const value of row) folded |= bits << BigInt(value);
        bits = folded;
    }
    // Closest set bit below target, then the smallest one above it.
    const below = bits & ((1n << BigInt(target + 1)) - 1n);
    let best = below ? target - (below.toString(2).length - 1) : Infinity;
    const above = bits >> BigInt(target + 1);
    if (above) {
        // above & -above isolates the lowest set bit; its bit length is
        // one more than that bit's index, i.e. the gap to target.
        const cand = (above & -above).toString(2).length;
        best = Math.min(best, cand);
    }
    return best;
};
