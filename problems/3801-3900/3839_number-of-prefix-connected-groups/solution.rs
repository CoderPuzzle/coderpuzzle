use std::collections::HashMap;

impl Solution {
    pub fn prefix_connected(words: Vec<String>, k: i32) -> i32 {
        // Sharing the first k characters is transitive, so each connected
        // group is exactly one k-prefix and counting groups of size >= 2
        // is counting prefixes that occur at least twice.
        let k = k as usize;
        let mut counts: HashMap<&str, i32> = HashMap::new();
        for word in &words {
            if word.len() >= k {
                *counts.entry(&word[..k]).or_insert(0) += 1;
            }
        }
        // A group needs at least two words, so prefixes seen once do not
        // count; the answer is at most n <= 5000, exact in i32.
        counts.values().filter(|&&c| c >= 2).count() as i32
    }
}
