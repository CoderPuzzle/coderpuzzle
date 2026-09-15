impl Solution {
    pub fn non_special_count(l: i32, r: i32) -> i32 {
        // A number is special exactly when it is the square of a prime:
        // p*p has precisely the proper divisors 1 and p, any other number
        // has more than two (three divisors total forces the form
        // prime^2), and 1 itself has none. The specials in [l, r] are
        // therefore the squares of primes in [ceil(sqrt(l)),
        // floor(sqrt(r))] — at most sqrt(10^9) ~ 31623 candidates,
        // counted with one sieve. Square roots start from f64::sqrt but
        // are corrected with exact i64 multiplies, so rounding can never
        // move a boundary.
        fn isqrt(x: i64) -> i64 {
            let mut s = (x as f64).sqrt() as i64;
            while s * s > x {
                s -= 1;
            }
            while (s + 1) * (s + 1) <= x {
                s += 1;
            }
            s
        }
        let (l, r) = (l as i64, r as i64);
        let hi = isqrt(r);
        let lo = isqrt(l - 1) + 1; // smallest s with s*s >= l
        let mut composite = vec![false; (hi + 1) as usize];
        let mut specials = 0i64;
        for p in 2..=hi {
            if composite[p as usize] {
                continue;
            }
            if p >= lo {
                specials += 1;
            }
            let mut m = p * p;
            while m <= hi {
                composite[m as usize] = true;
                m += p;
            }
        }
        (r - l + 1 - specials) as i32
    }
}
