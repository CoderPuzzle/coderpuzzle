use std::collections::HashMap;

impl Solution {
    pub fn max_same_length_runs(s: String) -> i32 {
        // One scan cuts s into maximal equal-letter runs; the answer is the
        // largest number of runs that share a single length.
        let n = s.len();
        let bytes = s.as_bytes();
        let mut counts: HashMap<usize, i32> = HashMap::new();
        let mut i = 0;
        while i < n {
            let mut j = i;
            while j < n && bytes[j] == bytes[i] {
                j += 1;
            }
            *counts.entry(j - i).or_insert(0) += 1;
            i = j;
        }
        counts.values().cloned().max().unwrap_or(0)
    }
}
