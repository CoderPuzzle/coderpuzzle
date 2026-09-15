use std::collections::HashSet;

impl Solution {
    pub fn equal_frequency(word: String) -> bool {
        // Count all 26 letters, then try removing one occurrence of each
        // present letter and test whether the surviving frequencies
        // collapse to a single value. 26 candidates x O(26) check.
        let bytes = word.as_bytes();
        let mut freq = [0usize; 26];
        for &b in bytes {
            freq[(b - b'a') as usize] += 1;
        }
        for c in 0..26 {
            if freq[c] == 0 {
                continue;
            }
            freq[c] -= 1;
            let mut remaining = HashSet::new();
            for &f in &freq {
                if f > 0 {
                    remaining.insert(f);
                }
            }
            if remaining.len() <= 1 {
                return true;
            }
            freq[c] += 1;
        }
        false
    }
}
