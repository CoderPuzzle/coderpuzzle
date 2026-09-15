impl Solution {
    pub fn closest_primes(left: i32, right: i32) -> Vec<i32> {
        // Sieve of Eratosthenes up to right marks every prime once; one
        // ascending pass over [left, right] then walks only consecutive
        // primes, since a larger gap spanning a skipped prime can never
        // beat the adjacent gaps inside it. Replacing on strict
        // improvement keeps the earliest num1 among ties.
        let mut sieve = vec![true; (right + 1) as usize];
        sieve[0] = false;
        if right >= 1 {
            sieve[1] = false;
        }
        let mut f: i64 = 2;
        while f * f <= right as i64 {
            if sieve[f as usize] {
                let start = f * f;
                let mut m = start;
                while m <= right as i64 {
                    sieve[m as usize] = false;
                    m += f;
                }
            }
            f += 1;
        }
        let mut best_pair = [-1i32, -1i32];
        let mut previous: i32 = -1;
        for n in left..=right {
            if !sieve[n as usize] {
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
}
