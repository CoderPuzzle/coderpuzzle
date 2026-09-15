impl Solution {
    pub fn count_primes(n: i32) -> i32 {
        let n = n as usize;
        // No primes strictly below 2.
        if n < 3 {
            return 0;
        }
        // spf[x] = the smallest prime factor of x (0 while x is untouched);
        // the primes found so far collect in ascending order.
        let mut spf = vec![0usize; n];
        let mut primes: Vec<usize> = Vec::with_capacity(n / 10 + 16);
        for i in 2..n {
            if spf[i] == 0 {
                // Nothing smaller ever marked i, so i is prime (and its own
                // smallest prime factor).
                primes.push(i);
                spf[i] = i;
            }
            // Mark i*p composite for every prime p up to spf[i]: each
            // composite gets written exactly once, by its smallest factor.
            let limit = spf[i];
            for &p in &primes {
                if p > limit || i * p >= n {
                    break;
                }
                spf[i * p] = p;
            }
        }
        primes.len() as i32
    }
}
