/**
 * @param {number} startPos
 * @param {number} endPos
 * @param {number} k
 * @return {number}
 */
var numberOfWays = function (startPos, endPos, k) {
    // Only the distance matters. With r right and l left steps,
    // r - l = d and r + l = k force d <= k, (k - d) even, and
    // right = (k + d) / 2; any ordering of the steps is a distinct
    // way, so the count is C(k, right) mod 1e9+7.
    //
    // Modular products of two residues reach ~1e18, past Number's 2^53
    // exactness limit, so multiply through a 15-bit split that keeps
    // every intermediate below 2^46.
    const MOD = 1e9 + 7;
    const mul = (a, b) => {
        const aHi = Math.floor(a / 32768);
        const aLo = a % 32768;
        return (((aHi * b) % MOD) * 32768 + aLo * b) % MOD;
    };
    const d = Math.abs(endPos - startPos);
    if (d > k || (k - d) % 2 !== 0) {
        return 0;
    }
    const right = (k + d) / 2;

    const fact = new Array(k + 1).fill(1);
    for (let i = 1; i <= k; ++i) {
        // factor <= 1000 keeps these plain products below 2^53.
        fact[i] = (fact[i - 1] * i) % MOD;
    }
    const power = (base, exp) => {
        let result = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp & 1) {
                result = mul(result, base);
            }
            base = mul(base, base);
            exp >>= 1;
        }
        return result;
    };
    const invFact = new Array(k + 1).fill(1);
    invFact[k] = power(fact[k], MOD - 2);
    for (let i = k; i >= 1; --i) {
        invFact[i - 1] = (invFact[i] * i) % MOD;
    }
    return mul(mul(fact[k], invFact[right]), invFact[k - right]);
};
