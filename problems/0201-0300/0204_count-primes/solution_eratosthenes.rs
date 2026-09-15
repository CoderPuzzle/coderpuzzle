impl Solution {
    pub fn count_primes(n: i32) -> i32 {
        let n = n as usize;
        // No primes strictly below 2.
        if n < 3 {
            return 0;
        }
        // Sieve of Eratosthenes: whatever is never marked composite was not
        // a multiple of anything smaller, so it is prime.
        let mut is_composite = vec![false; n];
        let mut count = 0;
        for i in 2..n {
            if !is_composite[i] {
                count += 1;
                // Cross off multiples starting at i*i — smaller multiples
                // were marked by their smaller factors.
                if i * i < n {
                    let mut j = i * i;
                    while j < n {
                        is_composite[j] = true;
                        j += i;
                    }
                }
            }
        }
        count
    }
}
