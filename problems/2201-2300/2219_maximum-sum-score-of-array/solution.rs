// The suffix at i is total minus the prefix before it, so one running total
// plus the array total covers every index in a single pass.
impl Solution {
    pub fn maximum_sum_score(nums: Vec<i32>) -> i64 {
        let total: i64 = nums.iter().map(|&value| value as i64).sum();
        let mut prefix = 0i64;
        let mut best = i64::MIN;
        for &value in &nums {
            prefix += value as i64;
            best = best.max(prefix).max(total - prefix + value as i64);
        }
        best
    }
}
