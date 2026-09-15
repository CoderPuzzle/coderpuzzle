impl Solution {
    pub fn my_sqrt(x: i32) -> i32 {
        // Binary search for the largest m with m * m <= x: the predicate is
        // monotone (past the root, every square overshoots), so halving the
        // candidate interval lands exactly on the rounded-down square root.
        // 64-bit bounds and midpoint: near x = 2^31 - 1 the probes climb
        // toward x itself, and mid * mid reaches ~2^62, far past 32 bits.
        let mut low: i64 = 0;
        let mut high: i64 = x as i64;
        while low < high {
            // Round the midpoint up: with a plain floor the interval can stop
            // shrinking when low == mid, and the loop would never terminate.
            let mid = low + (high - low + 1) / 2;
            if mid * mid <= x as i64 {
                low = mid;
            } else {
                high = mid - 1;
            }
        }
        low as i32
    }
}
