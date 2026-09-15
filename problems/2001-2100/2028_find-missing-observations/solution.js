/**
 * @param {number[]} rolls
 * @param {number} mean
 * @param {number} n
 * @return {number[]}
 */
var missingRolls = function (rolls, mean, n) {
    const observedSum = rolls.reduce((sum, roll) => sum + roll, 0);
    const required = mean * (rolls.length + n) - observedSum;
    if (required < n || required > 6 * n) {
        return [];
    }

    const base = Math.floor(required / n);
    const remainder = required % n;
    const missing = new Array(n).fill(base);
    for (let i = 0; i < remainder; ++i) {
        missing[i]++;
    }
    return missing;
};
