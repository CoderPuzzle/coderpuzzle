use std::collections::HashSet;

impl Solution {
    pub fn distinct_prime_factors(nums: Vec<i32>) -> i32 {
        // The product never gets built (per the hint, it is astronomically
        // large): a prime divides the product exactly when it divides some
        // single element. Factor each element by trial division, peeling
        // every copy of a found factor so only primes escape the loop;
        // values are <= 1000, so d*d <= rest stays inside i32 by miles.
        let mut primes: HashSet<i32> = HashSet::new();
        for &value in &nums {
            let mut rest = value;
            let mut d = 2;
            while d * d <= rest {
                if rest % d == 0 {
                    primes.insert(d);
                    while rest % d == 0 {
                        rest /= d;
                    }
                }
                d += 1;
            }
            if rest > 1 {
                primes.insert(rest);
            }
        }
        primes.len() as i32
    }
}
