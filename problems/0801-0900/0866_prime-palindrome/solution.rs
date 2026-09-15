impl Solution {
    // A palindrome is fixed by its first half — mirroring the half
    // without repeating its last digit rebuilds it, and larger halves
    // give larger palindromes within a length. A palindrome with an
    // even number of digits has alternating digit sum 0, so it is
    // divisible by 11: 11 is the family's only prime, and above it
    // only odd lengths are scanned, each candidate >= n trial-divided
    // up to its square root. The [2, 2*10^8] answer guarantee keeps
    // the scan inside the 9-digit class, so every value built — at most
    // 999999999 — and every divisor square fit an i32.
    pub fn prime_palindrome(n: i32) -> i32 {
        if n <= 11 {
            // every prime below 12 is already a palindrome
            let mut x = n.max(2);
            while !Self::is_prime(x) {
                x += 1;
            }
            return x;
        }
        let mut lo = 10;
        loop {
            let mut half = lo;
            while half < lo * 10 {
                let mut x = half;
                let mut t = half / 10;
                while t > 0 {
                    x = x * 10 + t % 10;
                    t /= 10;
                }
                if x >= n && Self::is_prime(x) {
                    return x;
                }
                half += 1;
            }
            lo *= 10;
        }
    }

    // Trial division: 2 first, then odd divisors up to the square root.
    fn is_prime(x: i32) -> bool {
        if x < 2 {
            return false;
        }
        if x % 2 == 0 {
            return x == 2;
        }
        let mut d = 3;
        while d * d <= x {
            if x % d == 0 {
                return false;
            }
            d += 2;
        }
        true
    }
}
