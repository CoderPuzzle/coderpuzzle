/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countPartitions = function (nums, k) {
    // dp[i + 1] = ways to partition the first i + 1 elements. The last
    // segment is nums[j..i] for some start j; valid starts form a
    // contiguous range ending at i, grown by lowering lo until the window
    // spread is <= k. Monotonic deques expose the window min/max, pre
    // holds prefix sums of dp so a range sum is one subtraction.
    const MOD = 1000000007;
    const n = nums.length;
    const dp = new Array(n + 1).fill(0);
    const pre = new Array(n + 2).fill(0);
    dp[0] = 1;
    pre[1] = 1;
    let lo = 0;
    const mins = []; // indices, values increasing toward the back
    const maxs = []; // indices, values decreasing toward the back
    for (let i = 0; i < n; i++) {
        while (mins.length && nums[mins[mins.length - 1]] >= nums[i]) mins.pop();
        mins.push(i);
        while (maxs.length && nums[maxs[maxs.length - 1]] <= nums[i]) maxs.pop();
        maxs.push(i);
        while (nums[maxs[0]] - nums[mins[0]] > k) {
            if (mins[0] === lo) mins.shift();
            if (maxs[0] === lo) maxs.shift();
            lo++;
        }
        dp[i + 1] = (pre[i + 1] - pre[lo] + MOD) % MOD;
        pre[i + 2] = (pre[i + 1] + dp[i + 1]) % MOD;
    }
    return dp[n];
};
