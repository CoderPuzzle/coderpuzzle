impl Solution {
    pub fn minimum_partition(s: String, k: i32) -> i32 {
        // Greedy from the left: extend the current piece while its value
        // stays <= k, since splitting as late as possible is optimal. The
        // tentative value k * 10 + 9 overflows i32, so widen to i64.
        let mut pieces: i32 = 1;
        let mut value: i64 = 0;
        let limit = k as i64;
        for &ch in s.as_bytes() {
            let digit = (ch - b'0') as i64;
            let candidate = value * 10 + digit;
            if candidate <= limit {
                value = candidate;
            } else {
                // This digit must open a new piece; fail if it cannot stand
                // alone either.
                if digit > limit {
                    return -1;
                }
                pieces += 1;
                value = digit;
            }
        }
        pieces
    }
}
