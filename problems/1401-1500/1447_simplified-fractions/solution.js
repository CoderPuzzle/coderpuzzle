/**
 * @param {number} n
 * @return {string[]}
 */
var simplifiedFractions = function (n) {
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const result = [];
    for (let numer = 1; numer < n; numer++) {
        for (let denom = numer + 1; denom <= n; denom++) {
            if (gcd(numer, denom) === 1) {
                result.push(`${numer}/${denom}`);
            }
        }
    }
    return result;
};
