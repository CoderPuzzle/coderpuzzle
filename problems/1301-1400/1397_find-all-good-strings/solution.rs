impl Solution {
    pub fn find_good_strings(n: i32, s1: String, s2: String, evil: String) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let s1 = s1.as_bytes();
        let s2 = s2.as_bytes();
        let evil = evil.as_bytes();
        let m = evil.len();
        let mut fail = vec![0usize; m];
        let mut k = 0usize;
        for i in 1..m {
            while k > 0 && evil[i] != evil[k] {
                k = fail[k - 1];
            }
            if evil[i] == evil[k] {
                k += 1;
            }
            fail[i] = k;
        }

        // dp[pos][state][lo][hi] as flat array
        let stride = (m + 1) * 4;
        let mut dp: Vec<i64> = vec![0; (n + 1) * stride];
        for st in 0..=m {
            for lo in 0..2usize {
                for hi in 0..2usize {
                    let val: i64 = if st == m { 0 } else { 1 };
                    dp[(n * (m + 1) + st) * 4 + lo * 2 + hi] = val;
                }
            }
        }
        for pos in (0..n).rev() {
            let low_base = s1[pos];
            let high_base = s2[pos];
            for state in 0..=m {
                if state == m {
                    continue; // stays zero
                }
                for lo in 0..2usize {
                    for hi in 0..2usize {
                        let low_c: u8 = if lo == 1 { low_base } else { b'a' };
                        let high_c: u8 = if hi == 1 { high_base } else { b'z' };
                        let mut total: i64 = 0;
                        for code in low_c..=high_c {
                            // advance(state, code)
                            let mut st2 = state;
                            while st2 > 0 && evil[st2] != code {
                                st2 = fail[st2 - 1];
                            }
                            if evil[st2] == code {
                                st2 += 1;
                            }
                            if st2 == m {
                                continue;
                            }
                            let nlo = if lo == 1 && code == low_base { 1usize } else { 0usize };
                            let nhi = if hi == 1 && code == high_base { 1usize } else { 0usize };
                            total += dp[((pos + 1) * (m + 1) + st2) * 4 + nlo * 2 + nhi];
                        }
                        dp[(pos * (m + 1) + state) * 4 + lo * 2 + hi] = total % MOD;
                    }
                }
            }
        }
        (dp[1 * 2 + 1] % MOD) as i32
    }
}
