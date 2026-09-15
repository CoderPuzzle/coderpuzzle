impl Solution {
    pub fn count_palindromic_subsequences(s: String) -> i32 {
        // dp[x][i][j] counts the distinct palindromic subsequences of
        // s[i..j] that begin and end with chr(97 + x). An end that does
        // not match x shrinks off: dp[x][i+1][j] when s[i] != x, else
        // dp[x][i][j-1]. When both ends are x, gluing x onto both sides
        // of every palindromic interior gives 2 + sum_y dp[y][i+1][j-1]
        // — the +2 is "x" and "xx" — while adjacent ends carry only
        // those two. Every read stays in rows i and i+1, so two rolling
        // rows carry the table; the answer is sum_x dp[x][0][n-1].
        const MOD: i64 = 1_000_000_007;
        let s = s.as_bytes();
        let n = s.len();
        let mut prev: Vec<[i64; 4]> = vec![[0; 4]; n];
        let mut cur: Vec<[i64; 4]> = vec![[0; 4]; n];
        for i in (0..n).rev() {
            let c = (s[i] - b'a') as usize;
            cur[i] = [0; 4];
            cur[i][c] = 1;
            for j in i + 1..n {
                cur[j] = prev[j];
                if (s[j] - b'a') as usize == c {
                    if j == i + 1 {
                        cur[j][c] = 2;
                    } else {
                        let inner = prev[j - 1][0] + prev[j - 1][1] + prev[j - 1][2] + prev[j - 1][3];
                        cur[j][c] = (2 + inner) % MOD;
                    }
                } else {
                    cur[j][c] = cur[j - 1][c];
                }
            }
            std::mem::swap(&mut prev, &mut cur);
        }
        let total: i64 = prev[n - 1].iter().sum();
        (total % MOD) as i32
    }
}
