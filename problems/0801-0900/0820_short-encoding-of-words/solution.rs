impl Solution {
    pub fn minimum_length_encoding(words: Vec<String>) -> i32 {
        use std::collections::HashSet;
        // A word needs no slot of its own when another word ends with
        // it: start from every word, then discard strict suffixes.
        let mut keep: HashSet<&str> = words.iter().map(|w| w.as_str()).collect();
        for w in &words {
            let b = w.as_bytes();
            // Only proper suffixes (k >= 1) are removed, so w itself —
            // and duplicates of it — survive to share a single slot.
            for k in 1..b.len() {
                keep.remove(&w[k..]);
            }
        }
        // Survivors are exactly the words no other word ends with; each
        // pays len + 1 for its terminating '#'.
        let mut total: i32 = 0;
        for w in keep {
            total += w.len() as i32 + 1;
        }
        total
    }
}
