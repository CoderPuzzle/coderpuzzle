impl Solution {
    pub fn smallest_number(n: i32) -> i32 {
        // Every number whose bits are all set has the form 2^t - 1. The
        // smallest such value that is >= n uses exactly as many bits as n
        // has: i32::BITS - leading_zeros() is n's bit length (n >= 1, so
        // the value is never zero), making the answer the strictly greater
        // power of two minus one (hint 1). With n <= 1000 the result is at
        // most 1023 and fits an i32.
        (1i32 << (i32::BITS - n.leading_zeros())) - 1
    }
}
