impl Solution {
    // dp[i] holds the minimum number of beautiful pieces covering the suffix
    // &s[i..]. A longer first piece can strand a remainder that cannot be
    // split at all, so every cut point j is tried, not just the longest or
    // shortest beautiful prefix. More pieces than cutting everywhere is
    // impossible, so n + 1 acts as infinity; entries no transition reaches
    // stay there and the unreachability propagates through the table.
    pub fn minimum_beautiful_substrings(s: String) -> i32 {
        let s = s.as_bytes();
        let n = s.len();
        let mut dp = vec![n as i32 + 1; n + 1];
        dp[n] = 0;
        for i in (0..n).rev() {
            // A '0' at the left edge disqualifies the piece immediately:
            // leading zeros are never beautiful, whatever value follows.
            if s[i] == b'0' {
                continue;
            }
            let mut value: i32 = 0;
            for j in i..n {
                // Build the piece's value incrementally — multiply by two and
                // add the next bit — then certify it with the division loop:
                // divide by five while divisible; a quotient of one means a
                // power of five (ten divides down to two, not one).
                value = value * 2 + (s[j] - b'0') as i32;
                let mut rest = value;
                while rest % 5 == 0 {
                    rest /= 5;
                }
                if rest == 1 && dp[j + 1] + 1 < dp[i] {
                    dp[i] = dp[j + 1] + 1;
                }
            }
        }
        if dp[0] > n as i32 {
            -1
        } else {
            dp[0]
        }
    }
}
