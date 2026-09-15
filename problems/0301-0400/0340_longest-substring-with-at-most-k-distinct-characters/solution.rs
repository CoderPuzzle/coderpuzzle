use std::collections::HashMap;

impl Solution {
    pub fn length_of_longest_substring_k_distinct(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        // counts holds the multiplicities inside the window [left, right];
        // erasing a key at zero keeps counts.len() = distinct characters.
        let mut counts: HashMap<u8, i32> = HashMap::new();
        let mut left: usize = 0;
        let mut best: i32 = 0;
        for right in 0..bytes.len() {
            *counts.entry(bytes[right]).or_insert(0) += 1;
            // Shrink until valid: every superset of an invalid window is
            // invalid too, so shrinking from the left skips no candidate.
            while counts.len() as i32 > k {
                let c = bytes[left];
                let cnt = counts.get_mut(&c).unwrap();
                *cnt -= 1;
                if *cnt == 0 {
                    counts.remove(&c);
                }
                left += 1;
            }
            // Now the longest valid window ending at right is in hand.
            if (right - left + 1) as i32 > best {
                best = (right - left + 1) as i32;
            }
        }
        best
    }
}
