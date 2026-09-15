/**
 * @param {number[]} nums
 * @return {number}
 */
var countQuadruplets = function (nums) {
    // The condition rewrites to nums[a] + nums[b] == nums[d] - nums[c].
    // Sweep c left to right, and for each d > c count how many earlier
    // pairs (a, b) with b < c already sum to nums[d] - nums[c]; a map of
    // pair sums is extended by one entry per c step. Every valid
    // quadruplet is counted exactly once at its c, d pair.
    const n = nums.length;
    let ans = 0;
    const twoSum = new Map();
    for (let c = 0; c < n; ++c) {
        for (let a = 0; a < c - 1; ++a) {
            const s = nums[a] + nums[c - 1];
            twoSum.set(s, (twoSum.get(s) ?? 0) + 1);
        }
        for (let d = c + 1; d < n; ++d) {
            ans += twoSum.get(nums[d] - nums[c]) ?? 0;
        }
    }
    return ans;
};
