impl Solution {
    pub fn divide(dividend: i32, divisor: i32) -> i32 {
        // The one quotient that does not fit in 32 bits: -2^31 divided by -1 is 2^31.
        // Clamped up front per the statement's rule.
        if dividend == i32::MIN && divisor == -1 {
            return i32::MAX;
        }
        // MinInt32 has no positive 32-bit counterpart, so widen before magnitudes.
        let mut a = (dividend as i64).abs();
        let b = (divisor as i64).abs();
        // Magnitudes in, sign out: the quotient of the magnitudes with the
        // sign reapplied truncates toward zero by construction.
        let negative = (dividend < 0) != (divisor < 0);
        let mut quotient = 0i64;
        while a >= b {
            // Find the largest chunk = b doubled (by addition) that still
            // fits in a; multiple doubles alongside it as the chunk's weight.
            let mut chunk = b;
            let mut multiple = 1i64;
            while a >= chunk + chunk {
                chunk += chunk;
                multiple += multiple;
            }
            a -= chunk;
            quotient += multiple;
        }
        if negative {
            -(quotient as i32)
        } else {
            quotient as i32
        }
    }
}
