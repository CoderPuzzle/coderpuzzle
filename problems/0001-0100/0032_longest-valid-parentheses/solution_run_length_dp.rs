impl Solution {
    pub fn longest_valid_parentheses(s: String) -> i32 {
        let s = s.as_bytes();
        // dp[k] is the length of the balanced run ending at index k - 1;
        // entry 0 grounds the table just off the front of the string, so even
        // the first character has a "run before it" of length zero to read.
        let mut dp: Vec<i32> = vec![0; s.len() + 1];
        let mut best = 0;
        for (i, &ch) in s.iter().enumerate() {
            // An opener closes nothing, so no run ends on it and dp[i + 1]
            // keeps its zero.
            if ch == b'(' {
                continue;
            }
            // The run ending at the previous index has length dp[i], so index
            // i - 1 - dp[i] sits immediately to its left. A '(' there is
            // exactly this closer's partner: a '(' and a ')' with only
            // balanced material between them is what being matched means.
            let j = i as i32 - 1 - dp[i];
            if j >= 0 && s[j as usize] == b'(' {
                // Jump the matched pair: both brackets, everything they
                // enclose, plus the run ending just before the opener chains
                // on, so "()()" records 4 at its second closer rather than
                // restarting at 2.
                dp[i + 1] = i as i32 - j + 1 + dp[j as usize];
                if dp[i + 1] > best {
                    best = dp[i + 1];
                }
            }
        }
        best
    }
}
