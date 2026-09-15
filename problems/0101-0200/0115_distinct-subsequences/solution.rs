impl Solution {
    pub fn num_distinct(s: String, t: String) -> i32 {
        let s = s.as_bytes();
        let t = t.as_bytes();
        let m = t.len();
        // dp[j] = ways to form the first j chars of t using the prefix of s
        // processed so far. dp[0] = 1 encodes the empty string being formable
        // exactly once, by matching nothing. Counts are kept in i64s for
        // headroom during the run.
        let mut dp = vec![0i64; m + 1];
        dp[0] = 1;
        for &ch in s {
            // Sweep j downward so dp[j-1] is still the previous row's value
            // when read; a left-to-right sweep would let one character of s
            // be matched against several characters of t.
            for j in (1..=m).rev() {
                // Reading ch can only create new ways where it matches: every
                // earlier way of forming t[:j-1] extends by matching ch there.
                // Elsewhere ch is simply skipped and the count is unchanged.
                if t[j - 1] == ch {
                    dp[j] = dp[j].wrapping_add(dp[j - 1]);
                }
            }
        }
        dp[m] as i32
    }
}
