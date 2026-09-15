/**
 * @param {number[][]} items1
 * @param {number[][]} items2
 * @return {number[][]}
 */
var mergeSimilarItems = function (items1, items2) {
    // Accumulate weights per value in one map fed by both lists, then emit
    // the entries in ascending value order.
    const weights = new Map();
    for (const items of [items1, items2]) {
        for (const [value, weight] of items) {
            weights.set(value, (weights.get(value) || 0) + weight);
        }
    }
    return [...weights.entries()].sort((a, b) => a[0] - b[0]);
};
