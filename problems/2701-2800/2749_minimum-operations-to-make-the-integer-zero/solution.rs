impl Solution {
    pub fn make_the_integer_zero(num1: i32, num2: i32) -> i32 {
        // After k operations num1 became num1 - k*num2 - (sum of k powers of
        // two), so reaching 0 means m = num1 - k*num2 is a sum of exactly k
        // powers of two. That holds iff popcount(m) <= k <= m.
        for k in 1..=60i64 {
            // m peaks near 6.1e10, past i32 range: compute in i64.
            let m = num1 as i64 - k * num2 as i64;
            if m >= k && m.count_ones() <= k as u32 {
                // Scanning upward makes the first hit the minimum.
                return k as i32;
            }
        }
        -1
    }
}
