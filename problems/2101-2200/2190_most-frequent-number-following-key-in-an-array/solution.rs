use std::collections::HashMap;

impl Solution {
    pub fn most_frequent(nums: Vec<i32>, key: i32) -> i32 {
        // Count each value that immediately follows a key occurrence and
        // take the argmax; the input guarantees a unique winner.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for window in nums.windows(2) {
            if window[0] == key {
                *counts.entry(window[1]).or_insert(0) += 1;
            }
        }
        let mut best_value = 0;
        let mut best_count = -1;
        for (&value, &count) in &counts {
            if count > best_count {
                best_count = count;
                best_value = value;
            }
        }
        best_value
    }
}
