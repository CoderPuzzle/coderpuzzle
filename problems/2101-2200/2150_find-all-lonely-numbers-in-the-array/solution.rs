use std::collections::HashMap;

impl Solution {
    pub fn find_lonely(nums: Vec<i32>) -> Vec<i32> {
        // A lonely value appears exactly once and has neither neighbour
        // x - 1 nor x + 1 present; scanning nums in order keeps the
        // output in first-occurrence order.
        let mut count: HashMap<i32, i32> = HashMap::with_capacity(nums.len());
        for &x in &nums {
            *count.entry(x).or_insert(0) += 1;
        }
        let mut lonely = Vec::new();
        for &x in &nums {
            if count[&x] == 1 && !count.contains_key(&(x - 1)) && !count.contains_key(&(x + 1)) {
                lonely.push(x);
            }
        }
        lonely
    }
}
