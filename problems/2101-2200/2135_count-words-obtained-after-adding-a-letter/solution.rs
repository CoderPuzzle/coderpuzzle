use std::collections::HashSet;

impl Solution {
    pub fn word_count(start_words: Vec<String>, target_words: Vec<String>) -> i32 {
        fn mask(word: &str) -> u32 {
            // No letter repeats, so a word is fully described by the 26-bit
            // mask of letters it contains.
            let mut m = 0u32;
            for b in word.bytes() {
                m |= 1 << (b - b'a');
            }
            m
        }

        let starts: HashSet<u32> = start_words.iter().map(|w| mask(w)).collect();
        let mut count = 0;
        for t in &target_words {
            let m = mask(t);
            // A target is obtainable iff its mask is a start mask plus one
            // extra bit; clearing each set bit tests exactly that inverse.
            // Same-mask words never count — exactly one letter is appended.
            for bit in 0..26 {
                if m & (1 << bit) != 0 && starts.contains(&(m ^ (1 << bit))) {
                    count += 1;
                    break;
                }
            }
        }
        count
    }
}
