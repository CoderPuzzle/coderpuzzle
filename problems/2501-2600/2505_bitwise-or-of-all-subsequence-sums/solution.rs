impl Solution {
    pub fn subsequence_sum_or(nums: Vec<i32>) -> i64 {
        // Each element and each running prefix is itself a subsequence sum,
        // and together they carry every bit the full OR can raise, so one
        // pass folds both into the answer. Prefixes reach 10^14, hence i64.
        let mut ans: i64 = 0;
        let mut pre: i64 = 0;
        for value in nums {
            pre += value as i64;
            ans |= value as i64 | pre;
        }
        ans
    }
}
