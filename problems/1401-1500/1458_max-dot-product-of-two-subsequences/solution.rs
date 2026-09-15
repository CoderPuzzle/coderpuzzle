impl Solution {
    pub fn max_dot_product(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        let n = nums1.len();
        let m = nums2.len();
        let neg = i64::MIN / 4;
        let mut dp = vec![vec![neg; m + 1]; n + 1];
        for i in (0..n).rev() {
            for j in (0..m).rev() {
                let pair = (nums1[i] as i64) * (nums2[j] as i64);
                let tail = dp[i + 1][j + 1];
                let mut best = pair + tail.max(0);
                best = best.max(dp[i + 1][j]);
                best = best.max(dp[i][j + 1]);
                dp[i][j] = best;
            }
        }
        dp[0][0] as i32
    }
}
