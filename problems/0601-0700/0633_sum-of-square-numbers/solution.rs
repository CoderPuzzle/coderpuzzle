impl Solution {
    pub fn judge_square_sum(c: i32) -> bool {
        // A witness a² + b² = c confines both roots to 0..isqrt(c) — past
        // the root, one square alone would already top c — and the total
        // rises with a and falls with b, so two pointers sweep that
        // candidate triangle from its ends: a from 0, b from isqrt(c),
        // each probe comparing a² + b² with c, growing a on a shortfall
        // and shrinking b on an overshoot. A window that closes at a > b
        // saw no witness: 5 meets 1² + 2², while 3 runs 0² + 1² and
        // 1² + 1² short and exits. The descent refuses the float root: b
        // starts at 46341, the first root whose square passes the ceiling
        // 2³¹ - 1, and steps down while b * b > c — an exact integer
        // landing. The roots live in i64: the descent's seed square
        // already tops i32, and at c = 2³¹ - 1 the probe 297² + 46340²
        // reaches 2147483809, past the cap before b steps down.
        let c = c as i64;
        let mut b = 46341;
        while b * b > c {
            b -= 1;
        }
        let mut a = 0;
        while a <= b {
            let total = a * a + b * b;
            if total == c {
                return true;
            }
            if total < c {
                a += 1;
            } else {
                b -= 1;
            }
        }
        false
    }
}
