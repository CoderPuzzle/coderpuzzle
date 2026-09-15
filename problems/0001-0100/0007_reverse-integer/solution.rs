impl Solution {
    pub fn reverse(x: i32) -> i32 {
        let mut x = x;
        let mut rev = 0;
        while x != 0 {
            // Rust division truncates toward zero, so the popped digit
            // carries the sign: -123 pops -3, -2, -1 and builds -321.
            let pop = x % 10;
            x /= 10;
            // Clamp before the push, never after: the statement forbids
            // 64-bit slack, so rev * 10 + pop must provably stay in range.
            // The edge digits are 7 (i32::MAX) and -8 (i32::MIN).
            if rev > i32::MAX / 10 || (rev == i32::MAX / 10 && pop > 7) {
                return 0;
            }
            if rev < i32::MIN / 10 || (rev == i32::MIN / 10 && pop < -8) {
                return 0;
            }
            rev = rev * 10 + pop;
        }
        rev
    }
}
