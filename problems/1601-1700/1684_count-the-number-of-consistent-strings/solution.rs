// Consistency depends only on which letters a word uses, so fold allowed
// into one 26-bit mask: bit i means 'a' + i may appear.
impl Solution {
    pub fn count_consistent_strings(allowed: String, words: Vec<String>) -> i32 {
        let mut allowed_mask: u32 = 0;
        for byte in allowed.bytes() {
            allowed_mask |= 1 << (byte - b'a');
        }
        let mut count = 0;
        for word in &words {
            let mut mask: u32 = 0;
            for byte in word.bytes() {
                mask |= 1 << (byte - b'a');
            }
            // the word is consistent exactly when its mask holds no bit
            // outside allowed_mask — one AND answers the subset question
            if mask & !allowed_mask == 0 {
                count += 1;
            }
        }
        count
    }
}
