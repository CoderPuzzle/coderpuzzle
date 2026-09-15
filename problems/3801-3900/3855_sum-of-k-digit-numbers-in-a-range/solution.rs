impl Solution {
    pub fn sum_of_numbers(l: i32, r: i32, k: i32) -> i64 {
        const MOD: i64 = 1_000_000_007;
        let m = (r - l + 1) as i64;
        let digit_sum = (l + r) as i64 * m / 2;
        // A fixed position holds any one digit d of [l, r] in exactly
        // m^(k-1) of the m^k strings, so it contributes digit_sum *
        // m^(k-1) * 10^p; the place weights sum to the repunit
        // R(k) = (10^k - 1) / 9, reduced through Fermat's inverse of 9.
        let repunit = (pow_mod(10, k as i64, MOD) - 1) % MOD * pow_mod(9, MOD - 2, MOD) % MOD;
        digit_sum % MOD * pow_mod(m, k as i64 - 1, MOD) % MOD * repunit % MOD
    }
}

// Binary exponentiation: reduced factors stay below 2^30, so every
// product fits i64 exactly (below 2^60).
fn pow_mod(mut base: i64, mut exp: i64, m: i64) -> i64 {
    let mut result = 1;
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
