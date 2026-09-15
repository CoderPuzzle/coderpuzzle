use std::collections::HashMap;

impl Solution {
    // The condition rewrites to nums[a] + nums[b] == nums[d] - nums[c].
    // Sweep c left to right, and for each d > c count how many earlier
    // pairs (a, b) with b < c already sum to nums[d] - nums[c]; a map of
    // pair sums is extended by one entry per c step. Every valid
    // quadruplet is counted exactly once at its c, d pair. The maximum
    // answer is C(50, 4) = 230300, well inside i32.
    pub fn count_quadruplets(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut ans = 0i32;
        let mut two_sum: HashMap<i32, i32> = HashMap::new();
        for c in 0..n {
            for a in 0..c.saturating_sub(1) {
                let s = nums[a] + nums[c - 1];
                *two_sum.entry(s).or_insert(0) += 1;
            }
            for d in c + 1..n {
                ans += two_sum.get(&(nums[d] - nums[c])).copied().unwrap_or(0);
            }
        }
        ans
    }
}
