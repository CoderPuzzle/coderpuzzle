impl Solution {
    pub fn my_pow(x: f64, n: i32) -> f64 {
        fn power(base: f64, exp: i64) -> f64 {
            // Exponentiation by halving: compute the square of the half-size
            // subproblem once, then use it once (even exp) or twice (odd) —
            // x^n = (x^(n/2))^2, times x when exp is odd.
            if exp == 0 {
                // Base case: any nonzero base to the zero is 1.0.
                return 1.0;
            }
            let half = power(base, exp / 2);
            if exp % 2 == 0 {
                half * half
            } else {
                // One leftover factor of x for the odd exponent.
                half * half * base
            }
        }
        // Widen before negating: -(-2^31) = 2^31 overflows an i32.
        let exp = n as i64;
        if exp < 0 {
            // By symmetry x^n = 1 / x^(-n).
            1.0 / power(x, -exp)
        } else {
            power(x, exp)
        }
    }
}
