impl Solution {
    pub fn valid_subarray_split(nums: Vec<i32>) -> i32 {
        // dp[i] = fewest subarrays to validly split nums[..i]; dp[0] = 0.
        // The last subarray ends at i - 1, so its start j must satisfy
        // gcd(nums[j], nums[i - 1]) > 1, giving the transition dp[j] + 1.
        let n = nums.len();
        let inf = n + 1;
        let mut dp = vec![inf; n + 1];
        dp[0] = 0;
        for i in 1..=n {
            for j in 0..i {
                if Self::gcd(nums[j] as i64, nums[i - 1] as i64) > 1 && dp[j] + 1 < dp[i] {
                    dp[i] = dp[j] + 1;
                }
            }
        }
        if dp[n] < inf {
            dp[n] as i32
        } else {
            -1
        }
    }

    fn gcd(mut a: i64, mut b: i64) -> i64 {
        while b != 0 {
            let next = a % b;
            a = b;
            b = next;
        }
        a
    }
}
