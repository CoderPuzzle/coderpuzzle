impl Solution {
    pub fn length_of_lis(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // dp[i] = length of the longest increasing subsequence ending
        // exactly at i; the global answer is the max over all endings.
        let mut dp = vec![1i32; n];
        let mut answer = 1;
        for i in 0..n {
            // Every earlier smaller element can precede nums[i], so extend
            // the best of those chains by one.
            for j in 0..i {
                if nums[j] < nums[i] && dp[j] + 1 > dp[i] {
                    dp[i] = dp[j] + 1;
                }
            }
            answer = answer.max(dp[i]);
        }
        answer
    }
}
