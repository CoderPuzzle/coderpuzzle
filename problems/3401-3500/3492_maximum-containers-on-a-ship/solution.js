/**
 * @param {number} n
 * @param {number} w
 * @param {number} maxWeight
 * @return {number}
 */
var maxContainers = function (n, w, maxWeight) {
    // Two ceilings bound the load independently: the deck offers n*n cells,
    // and the weight budget fits maxWeight / w containers of uniform weight
    // w. Any count up to the smaller one is realizable, so the answer is
    // that minimum. Every value stays at or below 10^9, far below Number's
    // 2^53 ceiling for exact integers, so plain arithmetic is exact.
    return Math.min(n * n, Math.floor(maxWeight / w));
};
