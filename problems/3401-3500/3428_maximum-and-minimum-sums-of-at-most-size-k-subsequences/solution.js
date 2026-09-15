/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minMaxSums = function (nums, k) {
    // After sorting, nums[i] is the maximum of exactly those subsequences
    // whose other members come from the i smaller entries: summed over
    // sizes 1..k that is g(i) = sum_{j < k} C(i, j) subsequences, and
    // symmetrically it is the minimum of g(n-1-i) of them. So the answer
    // is sum nums[i] * (g(i) + g(n-1-i)) mod 10^9 + 7. Each partial row
    // sum rolls in O(1): Pascal gives g(i) = 2*g(i-1) - C(i-1, k-1), one
    // binomial per step from factorial tables. Products of two
    // mod-reduced residues reach (10^9 + 6)^2 ~ 10^18, past the double's
    // exact 2^53 range, so every multiplication runs on BigInt and the
    // final residue converts back to Number.
    const mod = 1000000007n;
    const n = nums.length;
    const sorted = [...nums].sort((a, b) => a - b);

    const fact = [1n];
    for (let i = 1; i < n; i++) {
        fact.push((fact[i - 1] * BigInt(i)) % mod);
    }
    const invFact = new Array(n).fill(1n);
    invFact[n - 1] = modPow(fact[n - 1], mod - 2n, mod);
    for (let i = n - 1; i > 0; i--) {
        invFact[i - 1] = (invFact[i] * BigInt(i)) % mod;
    }

    const choose = (a, b) => {
        if (b < 0 || b > a) {
            return 0n;
        }
        return (((fact[a] * invFact[b]) % mod) * invFact[a - b]) % mod;
    };

    const g = new Array(n);
    g[0] = 1n;
    for (let i = 1; i < n; i++) {
        g[i] = (((2n * g[i - 1] - choose(i - 1, k - 1)) % mod) + mod) % mod;
    }
    let total = 0n;
    for (let i = 0; i < n; i++) {
        total = (total + BigInt(sorted[i]) * ((g[i] + g[n - 1 - i]) % mod)) % mod;
    }
    return Number(total);
};

function modPow(base, exponent, mod) {
    let result = 1n;
    let b = base % mod;
    let e = exponent;
    while (e > 0n) {
        if (e % 2n === 1n) {
            result = (result * b) % mod;
        }
        b = (b * b) % mod;
        e /= 2n;
    }
    return result;
}
