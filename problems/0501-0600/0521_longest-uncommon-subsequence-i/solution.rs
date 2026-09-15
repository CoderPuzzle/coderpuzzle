impl Solution {
    // Identical strings have identical subsequence sets, so no string can be
    // a subsequence of exactly one of them.
    pub fn find_lus_length(a: String, b: String) -> i32 {
        if a == b {
            return -1;
        }
        // Otherwise the longer string itself is the witness: every string is
        // a subsequence of itself, and a longer one cannot hide inside a
        // shorter.
        a.len().max(b.len()) as i32
    }
}
