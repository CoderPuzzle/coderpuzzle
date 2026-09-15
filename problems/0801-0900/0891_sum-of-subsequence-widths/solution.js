/**
 * @param {number[]} nums
 * @return {number}
 */
var sumSubseqWidths = function (nums) {
    const MOD = 1000000007;
    // Width = max - min, so the total is the sum of subsequence maxes
    // minus mins; sorting loses nothing (inner order is irrelevant).
    const sorted = nums.slice().sort((a, b) => a - b);
    const n = sorted.length;
    const pow2 = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        pow2[i] = (pow2[i - 1] * 2) % MOD;
    }
    let total = 0;
    for (let i = 0; i < n; i++) {
        // sorted[i] is the max of 2^i subsequences (partners chosen before
        // it) and the min of 2^(n-1-i); each subsequence is booked to
        // exactly one index per role. The extra +MOD repairs the possibly
        // negative difference of the two powers.
        const d = pow2[i] - pow2[n - 1 - i];
        total = (((total + sorted[i] * d) % MOD) + MOD) % MOD;
    }
    return total;
};
