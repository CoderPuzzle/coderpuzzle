impl Solution {
    pub fn consecutive_numbers_sum(n: i32) -> i32 {
        // A run of L consecutive positive integers starting at a sums to
        // L*a + L*(L-1)/2, so n has a length-L representation exactly when
        // n - L*(L-1)/2 is a positive multiple of L. The smallest sum of
        // L terms is 1 + 2 + ... + L = L*(L+1)/2: once that minimum passes
        // n no run fits, and below it the remainder is at least L, so
        // divisibility alone pins a >= 1. Length 1 always divides — the
        // single-term sum n = n. L*(L+1) brushes 2e9 at the bound, past
        // i32's comfortable range, so the loop widens to i64.
        let n = n as i64;
        let mut count = 0;
        let mut length = 1i64;
        while length * (length + 1) / 2 <= n {
            if (n - length * (length - 1) / 2) % length == 0 {
                count += 1;
            }
            length += 1;
        }
        count
    }
}
