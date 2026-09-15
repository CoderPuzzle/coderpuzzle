impl Solution {
    pub fn find_max_form(strs: Vec<String>, m: i32, n: i32) -> i32 {
        let m = m as usize;
        let n = n as usize;
        // dp[i][j] = most strings pickable with at most i zeros and j ones:
        // a 0/1 knapsack with two resource axes; the all-zero table already
        // encodes "pick nothing".
        let mut dp = vec![vec![0i32; n + 1]; m + 1];
        for s in &strs {
            // Only the string's shape matters: its 0-count and 1-count.
            let bytes = s.as_bytes();
            let zeros = bytes.iter().filter(|&&b| b == b'0').count();
            let ones = bytes.len() - zeros;
            if zeros > m || ones > n {
                continue;
            }
            // Budgets iterate downward so every read sees values from
            // before this string's pass — enforcing 0/1 (once-per-string)
            // use. Take-or-skip: taking is optional when it doesn't pay.
            for i in (zeros..=m).rev() {
                for j in (ones..=n).rev() {
                    let cand = dp[i - zeros][j - ones] + 1;
                    if cand > dp[i][j] {
                        dp[i][j] = cand;
                    }
                }
            }
        }
        dp[m][n]
    }
}
