/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfPower = function (nums) {
    const MOD = 1000000007;
    const S = 32768; // 2^15
    const mulmod = (a, b) => {
        a %= MOD;
        b %= MOD;
        const a1 = Math.floor(a / S);
        const a0 = a - a1 * S;
        return (((a1 * b) % MOD) * S + a0 * b) % MOD;
    };
    const arr = nums.slice().sort((a, b) => a - b);
    let ans = 0;
    // s = sum of v * 2^(elements after v) over the processed prefix: each
    // earlier minimum's (minimum, padding) variants collapsed into one
    // accumulator, so a group's power x^2 * min is summed without
    // enumerating subsets.
    let s = 0;
    for (const x of arr) {
        // x is the group maximum here; the + x covers the singleton group
        // where x is its own minimum. Folded under the modulus since raw
        // values reach (10^9)^3.
        ans = (ans + mulmod(mulmod(x, x), (s + x) % MOD)) % MOD;
        // Advancing the sweep: every existing combination survives with or
        // without x as padding (doubling s), and x registers as a fresh
        // minimum.
        s = (2 * s + x) % MOD;
    }
    return ans;
};
