impl Solution {
    pub fn count_distinct(n: i64) -> i64 {
        // Count the zero-free integers in [1, n] directly from n's digits,
        // peeled off arithmetically. Every shorter length contributes a
        // full block of 9^k values; then a prefix matching n so far
        // branches to any smaller nonzero digit and completes freely. The
        // walk stops at n's first zero digit — nothing below can be
        // zero-free once the prefix carries one. i64 holds every
        // intermediate: each block is below 9^15 < 2^48 and the total
        // stays below n <= 10^15.
        let mut digits = [0i64; 16];
        let mut count = 0usize;
        let mut m = n;
        while m > 0 {
            digits[count] = m % 10;
            count += 1;
            m /= 10;
        }
        let mut total: i64 = 0;
        let mut pow9: i64 = 1;
        for _ in 1..count {
            pow9 *= 9;
            total += pow9;
        }
        let mut tight = true;
        for i in (0..count).rev() {
            if digits[i] > 1 {
                total += (digits[i] - 1) * pow9;
            }
            if digits[i] == 0 {
                tight = false;
                break;
            }
            pow9 /= 9;
        }
        if tight {
            total += 1;
        }
        total
    }
}
