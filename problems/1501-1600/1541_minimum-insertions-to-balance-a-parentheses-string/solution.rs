impl Solution {
    pub fn min_insertions(s: String) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut insertions = 0;
        // Number of '(' seen so far that are still waiting for their '))'.
        let mut open_count = 0;
        let mut i = 0;
        while i < n {
            if bytes[i] == b'(' {
                open_count += 1;
                i += 1;
                continue;
            }
            // A ')' is handled together with the character right after it.
            if i + 1 < n && bytes[i + 1] == b')' {
                // A full '))' pair; consume both characters at once.
                i += 2;
            } else {
                // A lone ')' with no partner right after it: charge one
                // insertion for the missing ')' and treat the pair as
                // completed on the spot.
                insertions += 1;
                i += 1;
            }
            // One closing pair has just been accounted for; it must belong
            // to a waiting '('. If none is waiting, the '(' itself is
            // missing.
            if open_count > 0 {
                open_count -= 1;
            } else {
                insertions += 1;
            }
        }
        // Every '(' still waiting never got its '))'; each needs a full
        // pair appended.
        insertions + open_count * 2
    }
}
