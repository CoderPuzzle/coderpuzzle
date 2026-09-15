/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var makeTheIntegerZero = function (num1, num2) {
    // After k operations num1 became num1 - k*num2 - (sum of k powers of
    // two), so reaching 0 means m = num1 - k*num2 is a sum of exactly k
    // powers of two. That holds iff popcount(m) <= k <= m.
    for (let k = 1; k <= 60; ++k) {
        // m peaks near 6.1e10 — beyond 32 bits, but Number is exact up to
        // 2^53. Its bitwise ops are not, so count set bits by division.
        const m = num1 - k * num2;
        let bits = 0;
        for (let rest = m; rest > 0; rest = Math.floor(rest / 2)) {
            bits += rest % 2;
        }
        if (m >= k && bits <= k) {
            // Scanning upward makes the first hit the minimum.
            return k;
        }
    }
    return -1;
};
