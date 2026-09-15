impl Solution {
    pub fn max_array_value(nums: Vec<i32>) -> i64 {
        let mut pile = i64::from(nums[nums.len() - 1]);
        let mut best = pile;
        for i in (0..nums.len() - 1).rev() {
            let value = i64::from(nums[i]);
            if pile >= value {
                pile += value;
            } else {
                pile = value;
            }
            best = best.max(pile);
        }
        best
    }
}
