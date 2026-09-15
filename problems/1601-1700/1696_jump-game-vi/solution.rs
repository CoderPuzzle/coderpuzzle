use std::collections::VecDeque;

impl Solution {
    pub fn max_result(nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        let k = k as usize;
        let mut dp = vec![0i64; n];
        dp[0] = nums[0] as i64;
        let mut window: VecDeque<usize> = VecDeque::new();
        window.push_back(0);
        // The deque holds indices with strictly decreasing dp values; it turns
        // dp[i] = nums[i] + max(dp[i-k .. i-1]) into a sliding-window maximum
        // answered in amortized O(1) per step.
        for i in 1..n {
            // Expire front indices that left the [i-k, i-1] hop window; the
            // front is then exactly the window's maximum.
            while window.front().copied().unwrap() + k < i {
                window.pop_front();
            }
            dp[i] = nums[i] as i64 + dp[*window.front().unwrap()];
            // Back entries with dp <= dp[i] can never be a window max again
            // while i is alive; <= also collapses equal scores.
            while let Some(&back) = window.back() {
                if dp[back] <= dp[i] {
                    window.pop_back();
                } else {
                    break;
                }
            }
            window.push_back(i);
        }
        dp[n - 1]
    }
}
