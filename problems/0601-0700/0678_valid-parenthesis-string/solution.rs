impl Solution {
    pub fn check_valid_string(s: String) -> bool {
        // The count of open '(' cannot be followed exactly through '*': every
        // star widens it into a range. lo tracks the fewest opens some
        // assignment leaves reachable, hi the most — '(' raises both, ')'
        // lowers both, and '*' trades one side for the other. lo is clamped
        // at 0 because a surplus ')' can never be undone later, while hi < 0
        // means even reading every '*' as '(' cannot absorb the ')' just
        // seen — false on the spot. The string is valid exactly when the
        // final range still contains 0.
        let bytes = s.as_bytes();
        let (mut lo, mut hi) = (0i32, 0i32);
        for &c in bytes {
            if c == b'(' {
                lo += 1;
                hi += 1;
            } else if c == b')' {
                lo -= 1;
                hi -= 1;
            } else {
                lo -= 1;
                hi += 1;
            }
            if hi < 0 {
                return false;
            }
            if lo < 0 {
                lo = 0;
            }
        }
        lo == 0
    }
}
