use std::collections::HashSet;

impl Solution {
    pub fn partition_string(s: String) -> Vec<String> {
        // Greedy replay of the procedure: grow the current segment one
        // character at a time and emit it the first moment it is not in the
        // seen set, then start a new segment at the next index. A tail that
        // reaches the end of s while still seen is never emitted — the loop
        // simply ends (Example 2's final "a" is dropped).
        let bytes = s.as_bytes();
        let mut segments: Vec<String> = Vec::new();
        let mut seen: HashSet<Vec<u8>> = HashSet::new();
        let mut start = 0usize;
        for stop in 1..=bytes.len() {
            let candidate = &bytes[start..stop];
            if seen.insert(candidate.to_vec()) {
                segments.push(String::from_utf8_lossy(candidate).into_owned());
                start = stop;
            }
        }
        segments
    }
}
