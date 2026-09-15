use std::collections::HashMap;

impl Solution {
    pub fn number_of_arithmetic_slices(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // dp[i][d] = number of arithmetic subsequences of length >= 2 ending
        // at i with common difference d. Hashing per (index, difference)
        // absorbs the huge, possibly negative differences.
        let mut dp: Vec<HashMap<i64, i64>> = (0..n).map(|_| HashMap::new()).collect();
        let mut total: i64 = 0;
        for i in 0..n {
            for j in 0..i {
                let d = nums[i] as i64 - nums[j] as i64;
                let cnt = *dp[j].get(&d).unwrap_or(&0);
                // Each length >= 2 subsequence ending at j extends by
                // nums[i] into a slice of length >= 3, counted once at its
                // last element.
                total += cnt;
                // cnt extensions plus the new length-2 pair (j, i) itself;
                // pairs of exactly length 2 reach the total only via
                // extension.
                *dp[i].entry(d).or_insert(0) += cnt + 1;
            }
        }
        total as i32
    }
}
