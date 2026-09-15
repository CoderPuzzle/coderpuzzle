impl Solution {
    pub fn predict_the_winner(nums: Vec<i32>) -> bool {
        let n = nums.len();
        // dp[i] = best (mover's score - opponent's score) on the window
        // ending at j; the clone of nums is the length-1 base case.
        let mut dp = nums.clone();
        for length in 2..=n {
            for i in 0..=(n - length) {
                let j = i + length - 1;
                // Take an end, bank it, and absorb the opponent's optimal
                // reply as a subtracted sub-difference. In place, dp[i] is
                // still window (i, j-1) and dp[i+1] is (i+1, j) — the two
                // shorter intervals the recurrence needs.
                dp[i] = (nums[i] - dp[i + 1]).max(nums[j] - dp[i]);
            }
        }
        // Player 1 moves first on the whole array; ties count as a win.
        dp[0] >= 0
    }
}
