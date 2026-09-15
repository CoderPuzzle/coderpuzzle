/**
 * @param {number} n
 * @param {number} s
 * @param {number} m
 * @return {number}
 */
var maximumValue = function (n, s, m) {
    if (n === 1) return s;
    const highCount = Math.floor(n / 2);
    const increaseFirst = s + m + (highCount - 1) * (m - 1);
    const decreaseFirst = s + m - 1 + (highCount - 1) * (m - 1);
    return Math.max(increaseFirst, decreaseFirst);
};
