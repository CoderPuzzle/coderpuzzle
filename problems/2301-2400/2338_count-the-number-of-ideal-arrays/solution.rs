impl Solution {
    pub fn ideal_arrays(n: i32, maxValue: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as i64;
        let max_value = maxValue as i64;
        // dp[v] = number of chains of the current length ending at value v
        let mut dp = vec![0i64; (max_value + 1) as usize];
        for v in 1..=max_value {
            dp[v as usize] = 1;
        }
        let mut comb: i64 = 1; // C(n-1, 0)
        let mut ans: i64 = 0;
        let mut chain_len: i64 = 1;
        while chain_len <= n {
            let mut total: i64 = 0;
            for &x in &dp {
                total = (total + x) % MOD;
            }
            ans = (ans + total * comb % MOD) % MOD;
            if chain_len == n {
                break;
            }
            // C(n-1, chain_len) = C(n-1, chain_len-1) * (n - chain_len) / chain_len
            comb = comb * (n - chain_len) % MOD * powmod(chain_len, MOD - 2, MOD) % MOD;
            let mut ndp = vec![0i64; (max_value + 1) as usize];
            for v in 1..=max_value {
                let cv = dp[v as usize];
                if cv == 0 {
                    continue;
                }
                let mut m = v + v;
                while m <= max_value {
                    ndp[m as usize] = (ndp[m as usize] + cv) % MOD;
                    m += v;
                }
            }
            dp = ndp;
            let mut s: i64 = 0;
            for &x in &dp {
                s += x;
            }
            if s == 0 {
                break;
            }
            chain_len += 1;
        }
        (ans % MOD) as i32
    }
}

fn powmod(mut base: i64, mut exp: i64, m: i64) -> i64 {
    let mut r: i64 = 1;
    base %= m;
    while exp > 0 {
        if exp & 1 == 1 {
            r = r * base % m;
        }
        base = base * base % m;
        exp >>= 1;
    }
    r
}
