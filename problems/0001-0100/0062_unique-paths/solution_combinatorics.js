/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    // Every path is m-1 downs and n-1 rights in some order, so counting
    // paths is counting arrangements: C(m+n-2, m-1).
    const big = m + n - 2;
    const small = Math.min(m - 1, n - 1);
    // Multiplicative formula: after step j the running value is exactly
    // C(big-small+j, j), so every division is exact. The intermediate
    // product stays far below 2^53, so doubles are exact here.
    let result = 1;
    for (let j = 1; j <= small; j++) {
        result = (result * (big - small + j)) / j;
    }
    return result;
};
