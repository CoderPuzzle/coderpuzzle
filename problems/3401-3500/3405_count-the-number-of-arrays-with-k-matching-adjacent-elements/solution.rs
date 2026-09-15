impl Solution {
    pub fn count_good_arrays(n: i32, m: i32, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let k = k as i64;
        // answer = m * C(n-1, k) * (m-1)^(n-1-k)  (mod 1e9+7)
        let mut fact = vec![1i64; n + 1];
        for i in 1..=n {
            fact[i] = fact[i - 1] * (i as i64) % MOD;
        }
        let mut inv_fact = vec![1i64; n + 1];
        inv_fact[n] = Self::pow_mod(fact[n], MOD - 2, MOD);
        for i in (1..=n).rev() {
            inv_fact[i - 1] = inv_fact[i] * (i as i64) % MOD;
        }

        let nn = n as i64;
        let comb: i64 = if k >= 0 && k <= nn - 1 {
            fact[(nn - 1) as usize] * inv_fact[k as usize] % MOD * inv_fact[(nn - 1 - k) as usize] % MOD
        } else {
            0
        };

        let base = ((m as i64 - 1) % MOD + MOD) % MOD;
        ((m as i64 % MOD) * comb % MOD * Self::pow_mod(base, nn - 1 - k, MOD) % MOD) as i32
    }

    fn pow_mod(mut base: i64, mut exp: i64, mod_: i64) -> i64 {
        let mut result: i64 = 1;
        base %= mod_;
        if base < 0 {
            base += mod_;
        }
        while exp > 0 {
            if exp & 1 == 1 {
                result = result * base % mod_;
            }
            base = base * base % mod_;
            exp >>= 1;
        }
        result
    }
}
