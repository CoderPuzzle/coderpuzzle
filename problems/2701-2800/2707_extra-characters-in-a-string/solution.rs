// dp[i] holds the fewest extra characters left over after breaking the
// prefix s[0:i] optimally; dp[0] is the empty prefix.
impl Solution {
    pub fn min_extra_char(s: String, dictionary: Vec<String>) -> i32 {
        let n = s.len();
        let mut dp = vec![n as i32 + 1; n + 1];
        dp[0] = 0;
        for i in 0..n {
            // skip move: leave s[i] as an extra character
            if dp[i] + 1 < dp[i + 1] {
                dp[i + 1] = dp[i] + 1;
            }
            // match moves: a word starting at i jumps to i + word.len()
            for word in &dictionary {
                let j = i + word.len();
                if j <= n && word.as_str() == &s[i..j] && dp[i] < dp[j] {
                    dp[j] = dp[i];
                }
            }
        }
        dp[n]
    }
}
