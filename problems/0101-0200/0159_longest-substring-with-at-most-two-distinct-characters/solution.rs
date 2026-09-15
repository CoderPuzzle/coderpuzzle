use std::collections::HashMap;

impl Solution {
    pub fn length_of_longest_substring_two_distinct(s: String) -> i32 {
        // Sliding window with a character count map. The map never holds more
        // than two entries, so the window is always a valid substring and the
        // answer is simply the largest width it ever reaches. s consists of
        // English letters, so its bytes are its characters.
        let s = s.as_bytes();
        let mut counts: HashMap<u8, i32> = HashMap::new();
        let mut best = 0;
        let mut left = 0;
        for right in 0..s.len() {
            *counts.entry(s[right]).or_insert(0) += 1;
            // A third distinct character broke the rule: shrink from the left
            // until one character's count drains to zero and leaves the map.
            while counts.len() > 2 {
                let leftmost = s[left];
                let count = counts.get_mut(&leftmost).unwrap();
                *count -= 1;
                if *count == 0 {
                    counts.remove(&leftmost);
                }
                left += 1;
            }
            best = best.max(right - left + 1);
        }
        best as i32
    }
}
