use std::collections::HashSet;

impl Solution {
    // Choosing x rewrites exactly the cells whose current value is x (all
    // maximal x-segments land on their target values), so a mismatched cell
    // keeps its value until an operation names that value. Naming a value
    // clears its whole mismatch class; no other cell moves. The answer is
    // the number of classes: distinct nums[i] where it differs from
    // target[i]. The count is at most n <= 1e5, so i32 carries it.
    pub fn min_operations(nums: Vec<i32>, target: Vec<i32>) -> i32 {
        let mut distinct: HashSet<i32> = HashSet::new();
        for (value, want) in nums.iter().zip(target.iter()) {
            if value != want {
                distinct.insert(*value);
            }
        }
        distinct.len() as i32
    }
}
