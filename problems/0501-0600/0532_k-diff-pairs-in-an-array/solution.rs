use std::collections::HashMap;

impl Solution {
    pub fn find_pairs(nums: Vec<i32>, k: i32) -> i32 {
        // One count map carries both halves: its keys are the distinct
        // values, so v + k membership is O(1), and its frequencies are
        // exactly what k == 0 asks for. A pair is identified by its two
        // values, so repeats enter the same pair at most once.
        let mut counts = HashMap::new();
        for value in nums {
            *counts.entry(value).or_insert(0) += 1;
        }
        let mut pairs = 0;
        if k == 0 {
            // A 0-diff pair needs two equal values at different indexes, so a
            // value contributes once when it occurs at least twice — further
            // copies add nothing.
            for frequency in counts.values() {
                if *frequency > 1 {
                    pairs += 1;
                }
            }
        } else {
            // k > 0: count each distinct value whose partner v + k is also
            // present; scanning only upward pairs every couple exactly once
            // and never matches a value with itself.
            for value in counts.keys() {
                if counts.contains_key(&(value + k)) {
                    pairs += 1;
                }
            }
        }
        pairs
    }
}
