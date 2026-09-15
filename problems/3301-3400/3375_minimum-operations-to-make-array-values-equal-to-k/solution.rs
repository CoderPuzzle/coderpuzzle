use std::collections::HashSet;

impl Solution {
    pub fn min_operations(nums: Vec<i32>, k: i32) -> i32 {
        // Values can only ever be lowered, so any element below k makes
        // the goal impossible. Otherwise each operation flattens every
        // level above some h down to h, which removes exactly one value
        // level: the current maximum, using h = the next level down
        // (hint 3). The minimum count is therefore the number of distinct
        // values strictly above k (hint 4), found in one pass with a set.
        let mut above = HashSet::new();
        for value in nums.iter() {
            if *value < k {
                return -1;
            }
            if *value > k {
                above.insert(*value);
            }
        }
        above.len() as i32
    }
}
