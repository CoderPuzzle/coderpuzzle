/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var minimumSum = function (n, k) {
    const below = Math.min(n, Math.floor(k / 2));
    const above = n - below;
    return (below * (below + 1)) / 2 + above * k + (above * (above - 1)) / 2;
};
