impl Solution {
    pub fn make_largest_special(s: String) -> String {
        // A swap trades two adjacent special blocks, so the pieces that can
        // move are the top-level special substrings — mountains, each closed
        // exactly when the running count (+1 on '1', -1 on '0') returns to
        // zero. Maximize every mountain from the inside out: its inside is
        // itself special, because the count stays positive until the closing
        // '0', so recurse on the inside, re-wrap in the outer 1...0, and lay
        // the maximal mountains out largest-first.
        let mut parts: Vec<String> = Vec::new();
        let mut count = 0i32;
        let mut start = 0usize;
        let bytes = s.as_bytes();
        for i in 0..bytes.len() {
            count += if bytes[i] == b'1' { 1 } else { -1 };
            if count == 0 {
                // The climb: the outer 1...0 goes on only after the inside
                // is maximal — "11011000" wraps its maximized inside
                // "110010" into "11100100".
                parts.push(format!(
                    "1{}0",
                    Solution::make_largest_special(s[start + 1..i].to_string())
                ));
                start = i + 1;
            }
        }
        // Largest-first order is the largest concatenation of the fixed
        // maximal block set.
        parts.sort();
        parts.reverse();
        parts.concat()
    }
}
