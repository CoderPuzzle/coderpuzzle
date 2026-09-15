function maxResult(nums: number[], k: number): number {
    const n = nums.length;
    const dp: number[] = new Array(n);
    dp[0] = nums[0];
    const window: number[] = [0];
    let head = 0;
    // The deque (head marks the live front) holds indices with strictly
    // decreasing dp values; it turns dp[i] = nums[i] + max(dp[i-k .. i-1])
    // into a sliding-window maximum answered in amortized O(1) per step.
    for (let i = 1; i < n; i++) {
        // Expire front indices that left the [i-k, i-1] hop window; the
        // front is then exactly the window's maximum.
        while (window[head] < i - k) {
            head++;
        }
        dp[i] = nums[i] + dp[window[head]];
        let tail = window.length;
        // Back entries with dp <= dp[i] can never be a window max again
        // while i is alive; <= also collapses equal scores.
        while (tail > head && dp[window[tail - 1]] <= dp[i]) {
            tail--;
        }
        window.length = tail;
        window.push(i);
    }
    return dp[n - 1];
}
