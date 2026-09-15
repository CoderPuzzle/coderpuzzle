impl Solution {
    pub fn max_sum(mut nums: Vec<i32>, k: i32, mul: i32) -> i64 {
        nums.sort_unstable_by(|a, b| b.cmp(a));
        let take = k.min((mul - 1).max(0)) as usize;
        (0..k as usize)
            .map(|i| nums[i] as i64 * if i < take { (mul - i as i32) as i64 } else { 1 })
            .sum()
    }
}
