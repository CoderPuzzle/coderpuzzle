impl Solution {
    pub fn number_of_ways(n: i32, x: i32, y: i32) -> i32 {
        // dp[j] counts the assignments of the first i performers onto
        // exactly j nonempty of the x stages. The next performer either
        // joins one of the j formed bands or opens one on one of the
        // x - j + 1 unused stages; walking j downward updates the row in
        // place. Each j-band arrangement later takes a score per band, so
        // the answer sums dp[j] * y^j. All arithmetic is modulo 1e9 + 7,
        // applied bottom-up over performers and bands -- no recursion.
        // Residues are < 2^30 and every intermediate product < 2e12, so
        // i64 covers each step exactly.
        const MOD: i64 = 1_000_000_007;
        let (n, x, y) = (n as usize, x as usize, y as i64);
        let mut dp = vec![0i64; x + 1];
        dp[0] = 1;
        for i in 1..=n {
            let top = i.min(x);
            for j in (1..=top).rev() {
                dp[j] = (dp[j] * j as i64 + dp[j - 1] * (x - j + 1) as i64) % MOD;
            }
            dp[0] = 0;
        }
        let mut ans = 0i64;
        let mut power = 1i64;
        for j in 1..=x {
            power = power * y % MOD;
            ans = (ans + dp[j] * power) % MOD;
        }
        ans as i32
    }
}
