impl Solution {
    pub fn largest_prime(n: i32) -> i64 {
        // Sieve once: it answers primality for every prime and for every
        // running total the scan below produces.
        let limit = n as usize;
        let mut sieve = vec![1u8; limit + 1];
        sieve[0] = 0;
        if limit >= 1 {
            sieve[1] = 0;
        }
        let mut i: usize = 2;
        while i * i <= limit {
            if sieve[i] == 1 {
                let mut j = i * i;
                while j <= limit {
                    sieve[j] = 0;
                    j += i;
                }
            }
            i += 1;
        }
        // Prefix sums of the prime sequence are exactly the consecutive
        // prime sums starting from 2; totals only grow, so the last prime
        // one seen before the total exceeds n is the largest. Totals pass
        // the 32-bit range near n = 5 * 10^5, so they accumulate in an
        // i64 (and stay far from that type's own overflow edge).
        let mut total: i64 = 0;
        let mut best: i64 = 0;
        for p in 2..=n as usize {
            if sieve[p] == 0 {
                continue;
            }
            total += p as i64;
            if total > n as i64 {
                break;
            }
            if sieve[total as usize] == 1 {
                best = total;
            }
        }
        best
    }
}
