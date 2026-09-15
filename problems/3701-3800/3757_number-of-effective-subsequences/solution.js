/**
 * @param {number[]} nums
 * @return {number}
 */
var countEffective = function (nums) {
    // A removal strictly decreases the OR exactly when it takes away every
    // element carrying at least one set bit of the total. For a non-empty
    // bit set S, the subsequences removing all occurrences of every bit in
    // S are counted by 2^free(S), where free(S) is the number of elements
    // carrying no bit of S (they alone are optional). Inclusion-exclusion
    // over S turns those counts into the number of subsequences killing at
    // least one bit.
    const n = nums.length;
    let total = 0;
    for (const x of nums) total |= x;
    // At most 20 bits live under 10^6; compress them to low positions.
    const bits = [];
    for (let b = 0; b < 20; ++b) {
        if ((total >> b) & 1) bits.push(b);
    }
    const k = bits.length;
    const full = (1 << k) - 1;
    // g[m] = how many elements compress to mask m; then h[m] = how many
    // compress to a SUBSET of m, so h[full ^ S] = free(S). Standard
    // sum-over-subsets: push each count down to its submasks. Counts stay
    // at most n (< 2^17) and powers of two below the modulus (~2^30), so
    // every product lands near 2^47 — inside exact double range.
    const g = new Array(1 << k).fill(0);
    for (const x of nums) {
        let m = 0;
        for (let i = 0; i < k; ++i) {
            if ((x >> bits[i]) & 1) m |= 1 << i;
        }
        g[m]++;
    }
    const h = g.slice();
    for (let b = 0; b < k; ++b) {
        const bit = 1 << b;
        const step = bit << 1;
        for (let base = 0; base < 1 << k; base += step) {
            for (let i = base; i < base + bit; ++i) {
                h[i + bit] = (h[i + bit] + h[i]) % MOD;
            }
        }
    }
    const pw = new Array(n + 1);
    pw[0] = 1;
    for (let i = 1; i <= n; ++i) pw[i] = (pw[i - 1] * 2) % MOD;
    let ans = 0;
    for (let S = 1; S < 1 << k; ++S) {
        let term = pw[h[full ^ S]];
        if ((bitCount(S) & 1) === 0) term = MOD - term;
        ans = (ans + term) % MOD;
    }
    return ans % MOD;
};

function bitCount(x) {
    let c = 0;
    while (x) {
        x &= x - 1;
        ++c;
    }
    return c;
}

const MOD = 1_000_000_007;
