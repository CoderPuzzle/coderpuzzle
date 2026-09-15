impl Solution {
    pub fn special_perm(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        let size = 1usize << n;
        // dp[mask][last]: ways to arrange exactly the indices in `mask`,
        // ending with `last`, every adjacent pair already compatible.
        // n <= 14 keeps the 2^n * n table small. Increasing mask order
        // finalizes each state before it propagates.
        let mut dp = vec![vec![0i64; n]; size];
        for i in 0..n {
            dp[1usize << i][i] = 1;
        }
        for mask in 0..size {
            for last in 0..n {
                if (mask >> last) & 1 == 0 {
                    continue;
                }
                let ways = dp[mask][last];
                if ways == 0 {
                    continue;
                }
                for nxt in 0..n {
                    if (mask >> nxt) & 1 == 1 {
                        continue;
                    }
                    // Push forward: append any unused index whose value
                    // divides nums[last] or is divided by it (checked
                    // symmetrically). Every special permutation decomposes
                    // uniquely into such steps, so none is double-counted.
                    if nums[last] % nums[nxt] == 0 || nums[nxt] % nums[last] == 0 {
                        let t = &mut dp[mask | (1usize << nxt)];
                        t[nxt] = (t[nxt] + ways) % MOD;
                    }
                }
            }
        }
        let mut total: i64 = 0;
        for i in 0..n {
            total = (total + dp[size - 1][i]) % MOD;
        }
        total as i32
    }
}
