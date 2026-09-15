impl Solution {
    pub fn unique_paths(m: i32, n: i32) -> i32 {
        // Every path is m-1 downs and n-1 rights in some order, so counting
        // paths is counting arrangements: C(m+n-2, m-1).
        let big = (m + n - 2) as i64;
        let small = (m - 1).min(n - 1) as i64;
        // Multiplicative formula: after step j the running value is exactly
        // C(big-small+j, j), so every division is exact. i64s absorb the
        // intermediate product even where the answer fits an i32.
        let mut result: i64 = 1;
        for j in 1..=small {
            result = result * (big - small + j) / j;
        }
        result as i32
    }
}
