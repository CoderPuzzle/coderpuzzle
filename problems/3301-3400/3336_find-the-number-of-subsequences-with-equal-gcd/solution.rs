impl Solution {
    fn gcd_euclid(mut a: i64, mut b: i64) -> i64 {
        while b != 0 {
            let t = a % b;
            a = b;
            b = t;
        }
        a
    }

    pub fn subsequence_pair_count(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // dp[g1][g2] = ways to split the processed prefix into a sequence with
        // gcd g1 and a sequence with gcd g2 (gcd 0 denotes an empty sequence).
        let max_val: usize = 200;
        let mut dp: Vec<Vec<i64>> = vec![vec![0; max_val + 1]; max_val + 1];
        let mut ndp: Vec<Vec<i64>> = vec![vec![0; max_val + 1]; max_val + 1];
        dp[0][0] = 1;
        for &xv in &nums {
            let x = xv as i64;
            for g1 in 0..=max_val {
                for g2 in 0..=max_val {
                    ndp[g1][g2] = dp[g1][g2];
                }
            }
            for g1 in 0..=max_val {
                for g2 in 0..=max_val {
                    let cur = dp[g1][g2];
                    if cur == 0 {
                        continue;
                    }
                    let ng1 = Self::gcd_euclid(g1 as i64, x) as usize;
                    ndp[ng1][g2] = (ndp[ng1][g2] + cur) % MOD;
                    let ng2 = Self::gcd_euclid(g2 as i64, x) as usize;
                    ndp[g1][ng2] = (ndp[g1][ng2] + cur) % MOD;
                }
            }
            std::mem::swap(&mut dp, &mut ndp);
        }

        let mut total: i64 = 0;
        for g in 1..=max_val {
            total = (total + dp[g][g]) % MOD;
        }
        total as i32
    }
}
