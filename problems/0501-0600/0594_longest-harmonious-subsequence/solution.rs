use std::collections::HashMap;

impl Solution {
    pub fn find_lhs(nums: Vec<i32>) -> i32 {
        // Deletion freedom reduces the subsequence to its value multiset:
        // only how often each value occurs matters, never the order. The
        // exactly-1 gap forces a harmonious pick onto the two values v and
        // v + 1, and a count-map key occurs at least once, so looking up
        // each key's successor is exactly the both-values-present test; the
        // largest count(v) + count(v + 1) wins, 0 when no adjacent pair
        // exists.
        let mut counts = HashMap::new();
        for value in nums {
            *counts.entry(value).or_insert(0) += 1;
        }
        let mut best = 0;
        for (&value, &count) in &counts {
            if let Some(&next) = counts.get(&(value + 1)) {
                best = best.max(count + next);
            }
        }
        best
    }
}
