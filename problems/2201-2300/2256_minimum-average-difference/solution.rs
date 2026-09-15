impl Solution {
    pub fn minimum_average_difference(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let total: i64 = nums.iter().map(|&x| x as i64).sum();
        let mut prefix = 0i64;
        let mut best_index = 0usize;
        let mut best_diff = i64::MAX;
        for (i, &x) in nums.iter().enumerate() {
            prefix += x as i64;
            let left_avg = prefix / (i as i64 + 1);
            let right_count = (n - i - 1) as i64;
            let right_avg = if right_count > 0 {
                (total - prefix) / right_count
            } else {
                0
            };
            let diff = (left_avg - right_avg).abs();
            if diff < best_diff {
                best_diff = diff;
                best_index = i;
            }
        }
        best_index as i32
    }
}
