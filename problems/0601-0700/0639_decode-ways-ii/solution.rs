impl Solution {
    pub fn num_decodings(s: String) -> i32 {
        // dp[i] counts the decodings of the suffix s[i:]: its first code is
        // one character (9 openings for '*', 1 for a nonzero digit, 0 for
        // '0') or two (15 for '**', 2 or 1 for '*d' as d <= 6 or not, 9/6/0
        // for 'd*' as d is 1/2/other, 1 for two digits valued 10..26).
        // Only dp[i+1] and dp[i+2] are ever read, so two rolling variables
        // replace the table; `cur` is i64: before its reduction one step
        // totals up to 9 * next1 + 15 * next2, near 24 * MOD, past 32-bit
        // range.
        const MOD: i64 = 1_000_000_007;
        let s = s.as_bytes();
        let (mut next1, mut next2) = (1i64, 1i64); // dp[i+1], dp[i+2]; empty suffix
        for i in (0..s.len()).rev() {
            let a = s[i];
            let mut cur = 0i64;
            if a == b'*' {
                cur = 9 * next1;
            } else if a != b'0' {
                cur = next1;
            }
            if i + 1 < s.len() {
                let b = s[i + 1];
                if a == b'*' {
                    cur += next2
                        * if b == b'*' {
                            15
                        } else if b <= b'6' {
                            2
                        } else {
                            1
                        };
                } else if a == b'1' {
                    cur += next2 * if b == b'*' { 9 } else { 1 };
                } else if a == b'2' {
                    cur += next2
                        * if b == b'*' {
                            6
                        } else if b <= b'6' {
                            1
                        } else {
                            0
                        };
                }
            }
            next2 = next1;
            next1 = cur % MOD;
        }
        next1 as i32
    }
}
