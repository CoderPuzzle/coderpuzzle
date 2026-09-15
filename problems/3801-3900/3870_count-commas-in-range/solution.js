/**
 * @param {number} n
 * @return {number}
 */
var countCommas = function (n) {
    // A number carries a comma exactly when it has at least four digits, and
    // every number from 1000 to 10^5 (the bound here) has exactly one comma.
    // The answer is how many integers lie in [1000, n]: n - 999, or 0 when n
    // is smaller.
    return Math.max(0, n - 999);
};
