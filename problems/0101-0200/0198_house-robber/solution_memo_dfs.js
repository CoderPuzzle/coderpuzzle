/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    const n = nums.length;
    // Top-down mirror of the rolling DP: best(i) = max loot from house i
    // onward. memo[i] caches it (-1 = not computed yet); n <= 100 keeps the
    // recursion depth trivially safe.
    const memo = new Array(n).fill(-1);
    const best = (i) => {
        // Past the last house there is nothing left to take.
        if (i >= n) return 0;
        if (memo[i] < 0) {
            // Rob house i (so i+1 is off limits) or skip it.
            memo[i] = Math.max(nums[i] + best(i + 2), best(i + 1));
        }
        return memo[i];
    };
    return best(0);
};
