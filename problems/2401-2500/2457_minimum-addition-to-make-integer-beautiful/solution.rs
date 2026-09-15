impl Solution {
    pub fn make_integer_beautiful(n: i64, target: i32) -> i64 {
        // Round n up to the next multiple of 10, then 100, and so on,
        // until the digit sum drops to target or below. Zeroing a suffix
        // is the only move that lowers a digit sum, and the smallest
        // beautiful value >= n is always such a round-up, so the first
        // round that fits is the minimum addition. n <= 10^12 keeps every
        // intermediate inside i64.
        let original = n;
        let mut value = n;
        let mut base: i64 = 10;
        while Self::digit_sum(value) > target {
            value = (value / base + 1) * base;
            base *= 10;
        }
        value - original
    }

    fn digit_sum(mut value: i64) -> i32 {
        let mut total = 0;
        while value > 0 {
            total += (value % 10) as i32;
            value /= 10;
        }
        total
    }
}
