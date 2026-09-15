impl Solution {
    pub fn balanced_string_split(s: String) -> i32 {
        // +1 for L, -1 for R: every return to zero is one more balanced
        // piece, and cutting at each is the finest valid split.
        let mut balance = 0;
        let mut pieces = 0;
        for ch in s.bytes() {
            balance += if ch == b'L' { 1 } else { -1 };
            if balance == 0 {
                pieces += 1;
            }
        }
        pieces
    }
}
