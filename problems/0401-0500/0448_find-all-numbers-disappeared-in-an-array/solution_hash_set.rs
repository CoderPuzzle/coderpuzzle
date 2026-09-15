use std::collections::HashSet;

impl Solution {
    pub fn find_disappeared_numbers(nums: Vec<i32>) -> Vec<i32> {
        // The direct reading: record every value in a hash set, then walk the
        // candidate range 1..n and keep the values the set does not hold.
        let seen: HashSet<i32> = nums.iter().copied().collect();
        let mut disappeared = Vec::new();
        // The set carries no order of its own; walking the candidates in
        // increasing order is what makes the pinned ascending output free.
        for value in 1..=nums.len() as i32 {
            if !seen.contains(&value) {
                disappeared.push(value);
            }
        }
        disappeared
    }
}
