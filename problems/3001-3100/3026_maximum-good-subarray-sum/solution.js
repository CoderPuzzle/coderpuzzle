/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumSubarraySum = function (nums, k) {
    const best = new Map(); // value -> minimum prefix sum P[i] for a start i
    best.set(nums[0], 0);
    let prefix = 0;
    let ans = null;
    const n = nums.length;
    for (let j = 0; j < n; j++) {
        prefix += nums[j]; // P[j+1]
        for (const candidate of [nums[j] - k, nums[j] + k]) {
            if (best.has(candidate)) {
                const value = prefix - best.get(candidate);
                if (ans === null || value > ans) ans = value;
            }
        }
        if (j + 1 < n) {
            const next = nums[j + 1];
            if (!best.has(next) || prefix < best.get(next)) {
                best.set(next, prefix);
            }
        }
    }
    return ans === null ? 0 : ans;
};
