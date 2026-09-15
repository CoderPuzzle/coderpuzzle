/**
 * @param {number[]} arr
 * @return {number}
 */
var trimMean = function (arr) {
    const a = [...arr].sort((x, y) => x - y);
    const n = a.length;
    const trim = Math.floor(n / 20); // 5% of n, always a whole number since n is a multiple of 20
    const kept = a.slice(trim, n - trim);
    return kept.reduce((sum, v) => sum + v, 0) / kept.length;
};
