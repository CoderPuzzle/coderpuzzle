/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var constrainedSubsetSum = function (nums, k) {
    const n = nums.length;
    const dp = new Array(n).fill(0);
    const dq = new Array(n).fill(0);
    let head = 0;
    let tail = 0;
    let best = -Infinity;
    for (let i = 0; i < n; i++) {
        while (head < tail && dq[head] < i - k) {
            head++;
        }
        let prev = head < tail ? dp[dq[head]] : 0;
        if (prev < 0) {
            prev = 0;
        }
        dp[i] = nums[i] + prev;
        while (head < tail && dp[dq[tail - 1]] <= dp[i]) {
            tail--;
        }
        dq[tail++] = i;
        if (dp[i] > best) {
            best = dp[i];
        }
    }
    return best;
};
