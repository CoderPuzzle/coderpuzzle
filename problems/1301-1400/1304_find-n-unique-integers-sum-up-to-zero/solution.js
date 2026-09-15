/**
 * @param {number} n
 * @return {number[]}
 */
var sumZero = function (n) {
    // Walk from -n/2 to n/2, skipping 0 for even n; every value pairs with
    // its negation so the array sums to zero with n distinct values.
    const result = [];
    const half = Math.floor(n / 2);
    for (let value = -half; value <= half; ++value) {
        if (value === 0 && n % 2 === 0) {
            continue;
        }
        result.push(value);
    }
    return result;
};
