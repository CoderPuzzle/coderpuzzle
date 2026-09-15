/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumLength = function (nums) {
    // Every reachable array is nums cut into contiguous blocks holding
    // block sums. dp[i] is the most blocks over the first i elements and
    // last[i] the smallest final-block sum among those partitions. A block
    // (j, i] extends partition j when pre[i] - pre[j] >= last[j]. dp never
    // decreases (the previous partition survives merging its final block
    // with the new element), so the best predecessor is the rightmost
    // valid one: keep predecessors on a frontier ordered by
    // pre[j] + last[j], pop entries a later index dominates, and
    // binary-search the largest key <= pre[i]. Prefix sums reach 10^10,
    // within Number's exact range (< 2^53) since n and nums[i] are at most
    // 10^5.
    const n = nums.length;
    const pre = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) pre[i + 1] = pre[i] + nums[i];
    const dp = new Array(n + 1).fill(0);
    const last = new Array(n + 1).fill(0);
    const stack = [0];
    const keys = [0];
    for (let i = 1; i <= n; i++) {
        let lo = 0,
            hi = keys.length - 1;
        while (lo < hi) {
            const mid = (lo + hi + 1) >> 1;
            if (keys[mid] <= pre[i]) lo = mid;
            else hi = mid - 1;
        }
        const j = stack[lo];
        dp[i] = dp[j] + 1;
        last[i] = pre[i] - pre[j];
        const key = pre[i] + last[i];
        while (dp[stack[stack.length - 1]] <= dp[i] && keys[keys.length - 1] >= key) {
            stack.pop();
            keys.pop();
        }
        stack.push(i);
        keys.push(key);
    }
    return dp[n];
};
