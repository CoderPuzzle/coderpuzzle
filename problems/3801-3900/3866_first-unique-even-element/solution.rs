use std::collections::HashMap;

impl Solution {
    pub fn first_unique_even(nums: Vec<i32>) -> i32 {
        // A value qualifies only when it is even and its count in nums is
        // exactly one. Counting all values first turns each "is this the
        // first unique even?" test into a constant-time lookup, so a single
        // left-to-right scan over nums returns the earliest match.
        let mut counts = HashMap::new();
        for &value in &nums {
            *counts.entry(value).or_insert(0) += 1;
        }
        for value in nums {
            if value % 2 == 0 && counts[&value] == 1 {
                return value;
            }
        }
        -1
    }
}
