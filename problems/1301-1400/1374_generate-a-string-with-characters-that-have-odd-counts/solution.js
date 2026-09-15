/**
 * @param {number} n
 * @return {string}
 */
var generateTheString = function (n) {
    if (n % 2 === 1) return "a".repeat(n);
    return "a".repeat(n - 1) + "b";
};
