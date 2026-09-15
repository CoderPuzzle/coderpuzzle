// A nice divisor carries at least one copy of every prime of n, so for
// n = p^a * q^b * ... the nice divisors number a * b * ...: the answer is
// the largest product of positive integers summing to at most primeFactors,
// and a part of size 1 never changes a product, so the budget is spent
// exactly. Break rule: a part x > 4 splits into floor(x/2) + ceil(x/2) with
// a larger product, and three 2s lose to two 3s, so only 3s and at most two
// 2s remain -- n <= 4 answers n itself; n % 3 == 0 -> 3^(n/3); n % 3 == 1 ->
// 4 * 3^((n-4)/3), where 2 + 2 beats 3 + 1; n % 3 == 2 -> 2 * 3^(n/3). The
// exponent reaches 10^9 / 3, so the power runs as an iterative
// square-and-multiply over residues mod 10^9 + 7 (~30 rounds). Every
// operand stays below the modulus, so a product is at most (10^9 + 6)^2 <
// 2^63, safely inside the i64 used here.
impl Solution {
    pub fn max_nice_divisors(prime_factors: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = i64::from(prime_factors);
        if n <= 4 {
            return n as i32;
        }
        let (residue, mut power) = match n % 3 {
            0 => (1, n / 3),
            1 => (4, (n - 4) / 3),
            _ => (2, n / 3),
        };
        let mut result = residue;
        let mut base: i64 = 3;
        while power > 0 {
            if power & 1 == 1 {
                result = result * base % MOD;
            }
            base = base * base % MOD;
            power >>= 1;
        }
        result as i32
    }
}
