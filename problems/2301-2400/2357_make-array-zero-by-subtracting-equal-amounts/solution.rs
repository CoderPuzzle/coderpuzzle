use std::collections::HashSet;

impl Solution {
    pub fn minimum_operations(nums: Vec<i32>) -> i32 {
        let mut values: HashSet<i32> = HashSet::new();
        for num in nums {
            if num > 0 {
                values.insert(num);
            }
        }
        values.len() as i32
    }
}
