use std::collections::HashSet;

impl Solution {
    // Strictly increasing means every value occurs once, so a triplet is
    // determined by its middle: count elements whose value - diff and
    // value + diff are both present.
    pub fn arithmetic_triplets(nums: Vec<i32>, diff: i32) -> i32 {
        let seen: HashSet<i32> = nums.iter().copied().collect();
        let mut count = 0;
        for &value in &nums {
            if seen.contains(&(value - diff)) && seen.contains(&(value + diff)) {
                count += 1;
            }
        }
        count
    }
}
