impl Solution {
    // Rows are Bob's last move; columns are diff = Bob's points minus
    // Alice's, shifted by n + 1 so -n..n indexes 0..2n+2. Each round,
    // target row t is fed by the two other rows — both moved by the same
    // delta(t, alice) — so one elementwise add plus one shifted copy
    // advances every diff at once, keeping the bottom-up pass at O(n^2)
    // with no recursion.
    pub fn count_winning_sequences(s: String) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let delta: [[i64; 3]; 3] = [[0, -1, 1], [1, 0, -1], [-1, 1, 0]]; // target x alice
        let code = |c: u8| {
            if c == b'F' {
                0usize
            } else if c == b'W' {
                1
            } else {
                2
            }
        };
        let bytes = s.as_bytes();
        let n = bytes.len();
        let offset = n + 1;
        let width = 2 * n + 3;
        let mut dp = vec![vec![0_i64; width]; 3];
        for m in 0..3 {
            dp[m][offset + delta[m][code(bytes[0])] as usize] = 1;
        }
        for i in 1..n {
            let a = code(bytes[i]);
            let mut ndp = vec![vec![0_i64; width]; 3];
            for t in 0..3 {
                let (u, v) = ((t + 1) % 3, (t + 2) % 3);
                let d = delta[t][a];
                for j in 0..width {
                    let nj = j as i64 + delta[t][a];
                    if nj < 0 || nj >= width as i64 {
                        continue;
                    }
                    let mut value = dp[u][j] + dp[v][j];
                    if value >= MOD {
                        value -= MOD;
                    }
                    ndp[t][nj as usize] = value;
                }
            }
            dp = ndp;
        }
        // Entries stay below MOD, so the triple-row total stays below
        // 6 * 10^3 * MOD and i64 absorbs it before the final reduction.
        let mut total: i64 = 0;
        for m in 0..3 {
            for j in offset + 1..width {
                total += dp[m][j];
            }
        }
        (total % MOD) as i32
    }
}
