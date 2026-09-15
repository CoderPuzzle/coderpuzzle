impl Solution {
    pub fn count_good_numbers(n: i64) -> i32 {
        // Positions split by parity: (n+1)//2 even indices each hold one of
        // the 5 even digits, n//2 odd indices one of the 4 prime digits. The
        // product 5^e * 4^o is folded by iterative square-and-multiply, so n
        // up to 10^15 costs ~50 modular multiplications.
        (power(5, (n + 1) / 2) * power(4, n / 2) % MOD) as i32
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
