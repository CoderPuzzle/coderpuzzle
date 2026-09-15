/**
 * @param {number} n
 * @return {number}
 */
var countOrders = function (n) {
    const MOD = 1000000007;
    let result = 1;
    // f(i) = f(i-1) * i * (2i-1): the 2(i-1) placed services leave
    // 2i-1 gaps; pickup picks one, delivery lands to its right (1+2+...+(2i-1))
    for (let i = 2; i <= n; i++) {
        result = (result * (2 * i - 1) * i) % MOD;
    }
    return result;
};
