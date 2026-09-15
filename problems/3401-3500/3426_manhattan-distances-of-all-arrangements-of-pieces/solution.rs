impl Solution {
    pub fn distance_sum(m: i32, n: i32, k: i32) -> i32 {
        // Fix an unordered pair of cells: both carry a piece in exactly
        // C(m*n - 2, k - 2) arrangements (place the remaining k - 2 pieces
        // anywhere else), so the answer is (pairwise distance sum over all
        // cell pairs) * C(m*n - 2, k - 2) mod 10^9 + 7. By axis separation,
        // rows d apart pair with n columns on each side, so the board sum
        // is n^2 * T(m) + m^2 * T(n) with T(M) = M * (M - 1) * (M + 1) / 6
        // -- three consecutive integers, so the division is exact.
        // M <= 10^5 keeps M^3 <= 10^15 and every residue product below
        // ~10^18, all inside i64; n * n alone would overflow i32, so it
        // widens first.
        const MOD: i64 = 1_000_000_007;
        let (m, n, k) = (m as i64, n as i64, k as i64);
        let total = (m * n) as usize;

        let mut fact = vec![1i64; total + 1];
        for i in 1..=total {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }
        let mut inv_fact = vec![1i64; total + 1];
        inv_fact[total] = Self::mod_pow(fact[total], MOD - 2, MOD);
        for i in (1..=total).rev() {
            inv_fact[i - 1] = inv_fact[i] * i as i64 % MOD;
        }

        let tri = |dim: i64| dim * (dim - 1) * (dim + 1) / 6 % MOD;
        let pairs = (n * n % MOD * tri(m) + m * m % MOD * tri(n)) % MOD;
        let choose = fact[total - 2] * inv_fact[(k - 2) as usize] % MOD * inv_fact[(total - k as usize) as usize] % MOD;
        (pairs * choose % MOD) as i32
    }

    fn mod_pow(mut base: i64, mut exp: i64, module: i64) -> i64 {
        let mut result = 1i64;
        base %= module;
        while exp > 0 {
            if exp & 1 == 1 {
                result = result * base % module;
            }
            base = base * base % module;
            exp >>= 1;
        }
        result
    }
}
