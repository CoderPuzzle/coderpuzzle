use std::collections::HashMap;
use std::collections::HashSet;

impl Solution {
    pub fn unique_occurrences(arr: Vec<i32>) -> bool {
        // Count every value, then compare the number of distinct values
        // with the number of distinct counts: they match exactly when no
        // two values share an occurrence count.
        let mut counts = HashMap::new();
        for value in arr {
            *counts.entry(value).or_insert(0) += 1;
        }
        let seen: HashSet<&i32> = counts.values().collect();
        seen.len() == counts.len()
    }
}
