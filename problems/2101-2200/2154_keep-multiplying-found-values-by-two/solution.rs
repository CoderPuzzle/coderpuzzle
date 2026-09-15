// One O(1) set lookup per doubling step replaces a fresh scan of nums
// each time; values stay <= 2048 (double the 1000 cap), so no type ever
// comes close to overflowing.
use std::collections::HashSet;

impl Solution {
    pub fn find_final_value(nums: Vec<i32>, original: i32) -> i32 {
        let seen: HashSet<i32> = nums.into_iter().collect();
        let mut original = original;
        while seen.contains(&original) {
            original *= 2;
        }
        original
    }
}
