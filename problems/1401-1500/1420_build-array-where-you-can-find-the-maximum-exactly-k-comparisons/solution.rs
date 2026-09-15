impl Solution {
    pub fn num_of_arrays(n: i32, m: i32, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let (n, m, k) = (n as i64, m as i64, k as i64);
        if k <= 0 || k > n || k > m {
            return 0;
        }
        let mut dp = vec![vec![0i64; (m + 1) as usize]; (k + 1) as usize];
        for j in 1..=(m as usize) {
            dp[1][j] = 1;
        }
        for _ in 2..=n {
            let mut ndp = vec![vec![0i64; (m + 1) as usize]; (k + 1) as usize];
            for c in 1..=(k as usize) {
                let prev = &dp[c - 1];
                let mut pref = vec![0i64; (m + 1) as usize];
                for j in 1..=(m as usize) {
                    pref[j] = (pref[j - 1] + prev[j]) % MOD;
                }
                let cur = &dp[c];
                let row = &mut ndp[c];
                for j in 1..=(m as usize) {
                    row[j] = (cur[j] * j as i64 + pref[j - 1]) % MOD;
                }
            }
            dp = ndp;
        }
        let mut total: i64 = 0;
        for j in 1..=(m as usize) {
            total = (total + dp[k as usize][j]) % MOD;
        }
        total as i32
    }
}
