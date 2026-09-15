impl Solution {
    pub fn number_of_combinations(num: String) -> i32 {
        const MOD: i32 = 1_000_000_007;
        let bytes = num.as_bytes();
        let n = bytes.len();
        if n == 0 || bytes[0] == b'0' {
            return 0;
        }

        // lcp[i][j] = length of the longest common prefix of num[i:] and num[j:]
        let mut lcp: Vec<Vec<u16>> = vec![vec![0u16; n + 1]; n + 1];
        for i in (0..n).rev() {
            let ci = bytes[i];
            for j in (0..n).rev() {
                if ci == bytes[j] {
                    lcp[i][j] = lcp[i + 1][j + 1] + 1;
                }
            }
        }

        // pre[i][j] = sum_{k=1..j} dp[i][k] (mod MOD), where dp[i][j] counts
        // separations of num[:i] whose last number is num[i-j:i].
        // dp is recovered from consecutive pre differences mod MOD.
        let mut pre: Vec<Vec<i32>> = vec![vec![0i32; n + 1]; n + 1];
        for i in 1..=n {
            for j in 1..=i {
                let val: i32;
                if j == i {
                    val = 1; // whole prefix num[:i] is a single number
                } else if bytes[i - j] == b'0' {
                    val = 0; // leading zero not allowed
                } else {
                    let m = i - j;
                    let lim = std::cmp::min(j - 1, m);
                    let mut v = pre[m][lim];
                    if m >= j {
                        let a = i - 2 * j;
                        let b = m;
                        let l = lcp[a][b] as usize;
                        if l >= j || bytes[a + l] <= bytes[b + l] {
                            let mut add = pre[m][j] - pre[m][j - 1];
                            if add < 0 {
                                add += MOD;
                            }
                            v += add;
                            if v >= MOD {
                                v -= MOD;
                            }
                        }
                    }
                    val = v;
                }
                pre[i][j] = pre[i][j - 1] + val;
                if pre[i][j] >= MOD {
                    pre[i][j] -= MOD;
                }
            }
        }
        pre[n][n]
    }
}
