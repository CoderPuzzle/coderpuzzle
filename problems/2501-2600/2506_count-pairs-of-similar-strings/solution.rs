use std::collections::HashMap;

impl Solution {
    pub fn similar_pairs(words: Vec<String>) -> i32 {
        // Similarity ignores multiplicity and order: a 26-bit signature with
        // one bit per letter identifies each character set, and counting
        // earlier occurrences of the running signature adds every eligible
        // pair on the fly.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        let mut total: i32 = 0;
        for word in &words {
            let mut signature: i32 = 0;
            for ch in word.chars() {
                signature |= 1 << (ch as i32 - 'a' as i32);
            }
            let slot = counts.entry(signature).or_insert(0);
            total += *slot;
            *slot += 1;
        }
        total
    }
}
