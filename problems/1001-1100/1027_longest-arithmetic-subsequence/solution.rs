impl Solution {
    pub fn longest_arith_seq_length(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut dp: Vec<std::collections::HashMap<i32, i32>> =
            (0..n).map(|_| std::collections::HashMap::new()).collect();
        let mut best = 1;
        for i in 0..n {
            for j in 0..i {
                let d = nums[i] - nums[j];
                let length = dp[j].get(&d).copied().unwrap_or(1) + 1;
                let slot = dp[i].entry(d).or_insert(0);
                if length > *slot {
                    *slot = length;
                    if length > best {
                        best = length;
                    }
                }
            }
        }
        best
    }
}
