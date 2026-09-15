impl Solution {
    pub fn max_operations(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let candidates = [nums[0] + nums[1], nums[n - 1] + nums[n - 2], nums[0] + nums[n - 1]];
        let mut best = 0;
        for &score in &candidates {
            best = best.max(Self::max_for_score(&nums, score));
        }
        best
    }

    // dp[l][r] = max deletions inside nums[l..r] achieving `score`
    fn max_for_score(nums: &[i32], score: i32) -> i32 {
        let n = nums.len();
        let mut dp = vec![vec![0i32; n]; n];
        for length in 2..=n {
            for l in 0..n + 1 - length {
                let r = l + length - 1;
                let mut best = 0;
                if nums[l] + nums[l + 1] == score {
                    let sub = if l + 2 <= r { dp[l + 2][r] } else { 0 };
                    best = best.max(1 + sub);
                }
                if nums[r] + nums[r - 1] == score {
                    let sub = if l + 2 <= r { dp[l][r - 2] } else { 0 };
                    best = best.max(1 + sub);
                }
                if nums[l] + nums[r] == score {
                    let sub = if l + 2 <= r { dp[l + 1][r - 1] } else { 0 };
                    best = best.max(1 + sub);
                }
                dp[l][r] = best;
            }
        }
        dp[0][n - 1]
    }
}
