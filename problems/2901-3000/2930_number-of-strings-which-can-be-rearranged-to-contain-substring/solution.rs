impl Solution {
    fn pow(base: i64, mut exp: i64) -> i64 {
        const MOD: i64 = 1_000_000_007;
        let mut result = 1;
        let mut factor = base % MOD;
        while exp > 0 {
            if exp & 1 == 1 {
                result = result * factor % MOD;
            }
            factor = factor * factor % MOD;
            exp >>= 1;
        }
        result
    }

    pub fn string_count(n: i32) -> i32 {
        // Inclusion-exclusion over the three deficits (missing 'l',
        // missing 't', at most one 'e'): 26^n minus strings missing each
        // requirement, re-adding intersections. Each modular power stays
        // below 10^9+7, so the signed sum fits an i64 with room to spare.
        let wide = i64::from(n) % 1_000_000_007;
        let total =
            Self::pow(26, i64::from(n)) - 3 * Self::pow(25, i64::from(n)) - wide * Self::pow(25, i64::from(n) - 1)
                + 3 * Self::pow(24, i64::from(n))
                + 2 * wide * Self::pow(24, i64::from(n) - 1)
                - Self::pow(23, i64::from(n))
                - wide * Self::pow(23, i64::from(n) - 1);
        ((total % 1_000_000_007 + 1_000_000_007) % 1_000_000_007) as i32
    }
}
