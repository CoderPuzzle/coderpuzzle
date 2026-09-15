/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @param {number[]} source
 * @param {number[]} dest
 * @return {number}
 */
var numberOfWays = function (n, m, k, source, dest) {
    const MOD = 1000000007;
    // a * b mod MOD for a, b < MOD: split b into a 15-bit low half and a
    // high half so every intermediate stays far below 2^53, where Number
    // arithmetic is exact.
    const mulmod = (a, b) => {
        const bLow = b & 32767;
        const bHigh = b >> 15;
        return (((bHigh * a) % MOD) * 32768 + bLow * a) % MOD;
    };
    // lineCounts: walks of t steps (each step to a different position on a
    // line of `size` cells) ending at target vs anywhere else. A step into
    // target can come from any other position; a step elsewhere has
    // size - 1 options from target and size - 2 from any other position.
    const lineCounts = (size, start, target) => {
        const a = new Array(k + 1).fill(0);
        const b = new Array(k + 1).fill(0);
        if (start === target) {
            a[0] = 1;
        } else {
            b[0] = 1;
        }
        const offByOne = (size - 1) % MOD;
        const offByTwo = (size - 2) % MOD;
        for (let t = 0; t < k; ++t) {
            a[t + 1] = b[t];
            b[t + 1] = (mulmod(a[t], offByOne) + mulmod(b[t], offByTwo)) % MOD;
        }
        return a;
    };
    const ax = lineCounts(n, source[0], dest[0]);
    const ay = lineCounts(m, source[1], dest[1]);
    // Factorials for choosing which of the k moves change x.
    const fact = new Array(k + 1).fill(1);
    for (let i = 1; i <= k; ++i) fact[i] = mulmod(fact[i - 1], i);
    const power = (base, exp) => {
        let result = 1;
        while (exp > 0) {
            if (exp & 1) result = mulmod(result, base);
            base = mulmod(base, base);
            exp >>= 1;
        }
        return result;
    };
    const invFact = new Array(k + 1).fill(1);
    invFact[k] = power(fact[k], MOD - 2);
    for (let i = k; i >= 1; --i) invFact[i - 1] = mulmod(invFact[i], i);
    // A move keeps one coordinate fixed, so x and y evolve independently:
    // with i of the k moves changing x, the x-walk has i steps, the y-walk
    // k - i steps, and their interleavings number C(k, i).
    let ans = 0;
    for (let i = 0; i <= k; ++i) {
        const comb = mulmod(mulmod(fact[k], invFact[i]), invFact[k - i]);
        ans = (ans + mulmod(mulmod(comb, ax[i]), ay[k - i])) % MOD;
    }
    return ans;
};
