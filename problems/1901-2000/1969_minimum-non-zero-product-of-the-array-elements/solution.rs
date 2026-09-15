impl Solution {
    pub fn min_non_zero_product(p: i32) -> i32 {
        // Every integer in [1, 2^p - 1] pairs with its bitwise complement
        // 2^p - 1 - x: the two use exactly opposite bits, so swapping can push
        // all the 1s onto one of them and each pair collapses to (1, 2^p - 2)
        // with product 2^p - 2. The unpaired all-ones 2^p - 1 stays untouched
        // (reducing it would force a zero). With 2^(p-1) - 1 pairs the minimum
        // non-zero product is (2^p - 2)^(2^(p-1) - 1) * (2^p - 1), folded by
        // iterative square-and-multiply — p up to 60 costs ~60 squarings.
        let full: i64 = (1i64 << p) - 1;
        let base: i64 = full - 1;
        let exp: i64 = (1i64 << (p - 1)) - 1;
        (power(base, exp) * (full % MOD) % MOD) as i32
    }
}

const MOD: i64 = 1_000_000_007;

// Squares stay below (10^9+6)^2 ~ 10^18, safely inside i64 range.
fn power(mut base: i64, mut exp: i64) -> i64 {
    let mut result: i64 = 1;
    base %= MOD;
    while exp > 0 {
        if exp & 1 == 1 {
            result = result * base % MOD;
        }
        base = base * base % MOD;
        exp >>= 1;
    }
    result
}
