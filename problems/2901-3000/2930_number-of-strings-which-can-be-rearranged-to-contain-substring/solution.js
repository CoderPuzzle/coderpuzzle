/**
 * @param {number} n
 * @return {number}
 */
var stringCount = function (n) {
    // Inclusion-exclusion over the three deficits (missing 'l', missing
    // 't', at most one 'e'): 26^n minus strings missing each requirement,
    // re-adding intersections. Modular powers use BigInt so each product
    // (up to ~10^18) stays exact before reducing mod 1e9+7.
    const MOD = 1000000007n;
    const pow = (base, exp) => {
        let result = 1n;
        let factor = BigInt(base) % MOD;
        while (exp > 0) {
            if (exp % 2 === 1) {
                result = (result * factor) % MOD;
            }
            factor = (factor * factor) % MOD;
            exp = Math.floor(exp / 2);
        }
        return result;
    };
    const wide = n % Number(MOD);
    const total =
        Number(pow(26, n)) -
        3 * Number(pow(25, n)) -
        wide * Number(pow(25, n - 1)) +
        3 * Number(pow(24, n)) +
        2 * wide * Number(pow(24, n - 1)) -
        Number(pow(23, n)) -
        wide * Number(pow(23, n - 1));
    // Every term is < 10^9+7 and the multipliers keep the signed sum
    // below 2.1 * 10^14 < 2^53, so Number arithmetic stays exact here.
    const MOD_NUM = Number(MOD);
    return ((total % MOD_NUM) + MOD_NUM) % MOD_NUM;
};
