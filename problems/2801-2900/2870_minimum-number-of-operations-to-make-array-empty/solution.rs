use std::collections::HashMap;

impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        // The answer is at most nums.len() / 2, safely inside i32.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for num in nums {
            *counts.entry(num).or_insert(0) += 1;
        }
        let mut operations = 0;
        for count in counts.values() {
            if *count == 1 {
                return -1;
            }
            operations += (count + 2) / 3;
        }
        operations
    }
}
