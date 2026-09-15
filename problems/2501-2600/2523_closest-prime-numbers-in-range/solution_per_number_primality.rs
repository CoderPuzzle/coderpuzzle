impl Solution {
    pub fn closest_primes(left: i32, right: i32) -> Vec<i32> {
        // Per-number trial division judges each candidate in [left, right]
        // on its own: 2 and 3 fall to a single modulo each, and every
        // remaining prime divisor is a neighbor of a multiple of six, so
        // the test tries d and d + 2 while stepping d by six, stopping
        // once d * d passes n. One ascending scan then keeps only the
        // previous prime seen, replacing on strict improvement to keep
        // the earliest p among ties.
        let mut best_pair = [-1i32, -1i32];
        let mut previous: i32 = -1;
        for n in left..=right {
            if !Self::is_prime(n) {
                continue;
            }
            if previous != -1 && (best_pair[0] == -1 || n - previous < best_pair[1] - best_pair[0]) {
                best_pair[0] = previous;
                best_pair[1] = n;
            }
            previous = n;
        }
        best_pair.to_vec()
    }

    fn is_prime(n: i32) -> bool {
        if n < 2 {
            return false;
        }
        if n < 4 {
            return true;
        }
        if n % 2 == 0 || n % 3 == 0 {
            return false;
        }
        let mut d = 5;
        while d * d <= n {
            if n % d == 0 || n % (d + 2) == 0 {
                return false;
            }
            d += 6;
        }
        true
    }
}
