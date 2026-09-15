use std::collections::HashMap;

impl Solution {
    pub fn sort_by_reflection(nums: Vec<i32>) -> Vec<i32> {
        // Reflect every value once — reverse its binary string and parse
        // it back, which drops any leading zeros the reversal produced —
        // then sort on the composite key (reflection, value) so ties break
        // by ascending original value regardless of sort stability.
        let mut reflection: HashMap<i32, i64> = HashMap::new();
        for &value in &nums {
            let reversed: String = format!("{:b}", value).chars().rev().collect();
            reflection.insert(value, i64::from_str_radix(&reversed, 2).unwrap());
        }
        let mut sorted = nums;
        sorted.sort_by_key(|&value| (reflection[&value], value));
        sorted
    }
}
