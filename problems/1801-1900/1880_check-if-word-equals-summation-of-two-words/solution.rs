impl Solution {
    // Letter values are single decimal digits, so a positional fold
    // (v = v*10 + d) reproduces the concatenated-digit integer.
    pub fn is_sum_equal(first_word: String, second_word: String, target_word: String) -> bool {
        fn val(w: &str) -> i64 {
            let mut v = 0i64;
            for b in w.bytes() {
                v = v * 10 + (b - b'a') as i64;
            }
            v
        }
        val(&first_word) + val(&second_word) == val(&target_word)
    }
}
