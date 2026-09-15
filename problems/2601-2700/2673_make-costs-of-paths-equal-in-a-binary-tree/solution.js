/**
 * @param {number} n
 * @param {number[]} cost
 * @return {number}
 */
var minIncrements = function (n, cost) {
    // Walk heap indices from the deepest parent up to the root. At each
    // node the two child subtrees must end on a common maximum, so their
    // difference is charged once and the larger combined maximum travels
    // up. Totals stay far below 2^53: raising every leaf path to the
    // global maximum costs at most (#leaves * height * 10^4) < 2^40.
    const subtree = cost.slice();
    let total = 0;
    for (let node = Math.floor(n / 2); node >= 1; --node) {
        const left = subtree[2 * node - 1];
        const right = subtree[2 * node];
        total += Math.abs(left - right);
        subtree[node - 1] = Math.max(left, right) + cost[node - 1];
    }
    return total;
};
