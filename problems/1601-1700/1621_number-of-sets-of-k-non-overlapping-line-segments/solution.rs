impl Solution {
    pub fn number_of_sets(n: i32, k: i32) -> i32 {
        // Sort the k segments by left endpoint: l_1 < r_1, l_2 < r_2, ...,
        // l_k < r_k, with r_i <= l_(i+1) (equality allowed, since segments
        // may touch at a shared endpoint but not overlap). Shift the i-th
        // pair by (i - 1): a_i = l_i + (i - 1), b_i = r_i + (i - 1). Each
        // within-segment inequality l_i < r_i stays strict after an equal
        // shift, and each between-segment inequality r_i <= l_(i+1)
        // becomes b_i = r_i + (i - 1) < l_(i+1) + i = a_(i+1), now strict
        // too. So (a_1, b_1, ..., a_k, b_k) is a strictly increasing
        // sequence of 2k integers drawn from [0, n - 1 + (k - 1)], a
        // range of n + k - 1 values, and this shift is a bijection onto
        // strictly increasing sequences there. Choosing which 2k of
        // those n + k - 1 values appear determines the whole set, so the
        // answer is C(n + k - 1, 2k).
        const MOD: i64 = 1_000_000_007;
        let total = (n + k - 1) as usize;
        let pick = (2 * k) as usize;
        let mut fact = vec![1i64; total + 1];
        for i in 1..=total {
            fact[i] = fact[i - 1] * i as i64 % MOD;
        }
        let inv_pick = mod_pow(fact[pick], MOD - 2, MOD);
        let inv_rest = mod_pow(fact[total - pick], MOD - 2, MOD);
        (fact[total] * inv_pick % MOD * inv_rest % MOD) as i32
    }
}

fn mod_pow(mut base: i64, mut exp: i64, m: i64) -> i64 {
    let mut result = 1i64;
    base %= m;
    while exp > 0 {
        if exp & 1 == 1 {
            result = result * base % m;
        }
        base = base * base % m;
        exp >>= 1;
    }
    result
}
