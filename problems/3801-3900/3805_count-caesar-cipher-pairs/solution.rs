use std::collections::HashMap;

impl Solution {
    pub fn count_pairs(words: Vec<String>) -> i64 {
        // Shifting a word by k adds k to every letter, so two words are
        // similar exactly when subtracting each word's own first letter
        // maps both onto the same normalized key: (c - word[0]) mod 26.
        let mut counts: HashMap<Vec<u8>, i64> = HashMap::new();
        for word in &words {
            let bytes = word.as_bytes();
            let base = bytes[0] - b'a';
            let key: Vec<u8> = bytes.iter().map(|&b| (b - b'a' + 26 - base) % 26 + b'a').collect();
            *counts.entry(key).or_insert(0) += 1;
        }
        // Pairs live inside one class; n <= 10^5 bounds the total by
        // n(n-1)/2 < 5 * 10^9, exact in i64.
        counts.values().map(|&c| c * (c - 1) / 2).sum()
    }
}
