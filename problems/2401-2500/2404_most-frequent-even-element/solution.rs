use std::collections::HashMap;

impl Solution {
    pub fn most_frequent_even(nums: Vec<i32>) -> i32 {
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for num in nums {
            if num % 2 == 0 {
                *counts.entry(num).or_insert(0) += 1;
            }
        }
        let mut best_value = -1;
        let mut best_count = 0;
        for (&value, &count) in &counts {
            if count > best_count || (count == best_count && value < best_value) {
                best_count = count;
                best_value = value;
            }
        }
        best_value
    }
}
