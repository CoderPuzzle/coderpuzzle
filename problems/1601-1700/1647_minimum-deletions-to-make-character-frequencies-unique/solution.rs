use std::collections::HashSet;

impl Solution {
    pub fn min_deletions(s: String) -> i32 {
        // Count how often each letter occurs, then process the frequencies
        // from largest to smallest. Whenever a frequency repeats a value we
        // have already committed to, shrink it by one deletion at a time
        // until it lands on an unused value (or hits zero, meaning that
        // letter is deleted away entirely).
        let mut counts = [0i32; 26];
        for byte in s.bytes() {
            counts[(byte - b'a') as usize] += 1;
        }
        let mut freqs: Vec<i32> = counts.to_vec();
        freqs.sort_unstable_by(|a, b| b.cmp(a));

        let mut used: HashSet<i32> = HashSet::new();
        let mut deletions = 0;
        for mut freq in freqs {
            while freq > 0 && used.contains(&freq) {
                freq -= 1;
                deletions += 1;
            }
            if freq > 0 {
                used.insert(freq);
            }
        }
        deletions
    }
}
