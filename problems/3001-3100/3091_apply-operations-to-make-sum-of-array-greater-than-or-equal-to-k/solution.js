/**
 * @param {number} k
 * @return {number}
 */
var minOperations = function (k) {
    // All increases come first, all duplicates last: a final array of m
    // equal values v costs v-1 increases plus m-1 duplicates and sums to
    // m*v. Enumerate the single-element value v and take ceil(k/v)-1
    // duplicates; the best split wins. Every intermediate is at most
    // k + k <= 2*10^5 << 2^53, so Number arithmetic stays exact.
    let best = k - 1;
    for (let v = 1; v <= k; v++) {
        const dup = Math.max(Math.ceil(k / v) - 1, 0);
        best = Math.min(best, v - 1 + dup);
    }
    return best;
};
