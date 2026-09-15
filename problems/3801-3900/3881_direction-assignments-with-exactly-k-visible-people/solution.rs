impl Solution {
    // The number seen is (# left people choosing 'L') + (# right people
    // choosing 'R'), so Vandermonde's identity collapses the split sum to
    // 2 * C(n - 1, k). Modular products fit i64, the answer is an i32.
    pub fn count_visible_people(n: i32, pos: i32, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        if k > n - 1 {
            return 0;
        }
        let size = (n - 1) as usize;
        let mut fact = vec![0i64; size + 1];
        let mut inv_fact = vec![0i64; size + 1];
        fact[0] = 1;
        for i in 1..=size {
            fact[i] = fact[i - 1] * (i as i64) % MOD;
        }
        inv_fact[size] = Self::mod_pow(fact[size], MOD - 2, MOD);
        for i in (1..=size).rev() {
            inv_fact[i - 1] = inv_fact[i] * (i as i64) % MOD;
        }
        let comb = fact[(n - 1) as usize] * inv_fact[k as usize] % MOD * inv_fact[(n - 1 - k) as usize] % MOD;
        (2 * comb % MOD) as i32
    }

    // Fermat inverse via binary exponentiation, all products inside i64.
    fn mod_pow(mut base: i64, mut exp: i64, modulus: i64) -> i64 {
        let mut result = 1i64;
        base %= modulus;
        while exp > 0 {
            if exp & 1 == 1 {
                result = result * base % modulus;
            }
            base = base * base % modulus;
            exp >>= 1;
        }
        result
    }
}
