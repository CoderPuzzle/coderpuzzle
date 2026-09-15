/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var numSubseq = function (nums, target) {
    const MOD = 1000000007;
    // A subsequence is defined by membership, not order, so sorting loses
    // nothing; validity then depends only on smallest + largest <= target.
    nums = nums.slice().sort((a, b) => a - b);
    const n = nums.length;
    // Powers of two: elements strictly between the two pointers may be
    // included or excluded freely.
    const powers = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        powers[i] = (powers[i - 1] * 2) % MOD;
    }
    let total = 0;
    let lo = 0,
        hi = n - 1;
    while (lo <= hi) {
        if (nums[lo] + nums[hi] <= target) {
            // hi is the farthest legal partner of lo (earlier decrements
            // rule out anything beyond), so 2^(hi-lo) subsequences have
            // their minimum exactly at lo.
            total = (total + powers[hi - lo]) % MOD;
            lo++;
        } else {
            // nums[hi] is too large to pair with anything at or after lo.
            hi--;
        }
    }
    return total;
};
