/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number[][]} edges
 * @return {number}
 */
var maximumValueSum = function (nums, k, edges) {
    // Each operation XORs two endpoints, and tree connectivity lets any
    // even-sized subset of nodes be flipped, so only the parity of the
    // pick matters. delta = gain from flipping one node.
    const deltas = nums.map((x) => (x ^ k) - x);
    // Greedy: take every positive delta while the count stays even.
    const positives = deltas.filter((d) => d > 0);
    let base = nums.reduce((a, b) => a + b, 0) + positives.reduce((a, b) => a + b, 0);
    if (positives.length % 2 === 0) {
        return base;
    }
    // Odd flip count is illegal: either drop the smallest positive delta
    // or add the largest non-positive one, whichever costs less.
    let best = null;
    if (positives.length > 0) {
        best = Math.min(...positives);
    }
    const nonPositives = deltas.filter((d) => d <= 0);
    if (nonPositives.length > 0) {
        const penalty = -Math.max(...nonPositives);
        if (best === null || penalty < best) {
            best = penalty;
        }
    }
    return base - best;
};
