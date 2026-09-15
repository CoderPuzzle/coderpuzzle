use std::collections::HashSet;

impl Solution {
    pub fn distinct_prime_factors(nums: Vec<i32>) -> i32 {
        // The prime-support pin is the same; the factor source changes.
        // One sieve pass records the smallest prime factor of every value
        // up to max(nums), and each element then falls apart by repeated
        // division: the next piece of the remaining quotient is always a
        // table lookup, never a candidate search. Peeling each prime out
        // completely keeps the walk on sieve entries; values are <= 1000,
        // so an element holds at most 9 prime pieces (2^10 overshoots).
        let limit = *nums.iter().max().unwrap() as usize;
        let mut spf: Vec<usize> = (0..=limit).collect();
        let mut i = 2;
        while i * i <= limit {
            if spf[i] == i {
                let mut j = i * i;
                while j <= limit {
                    if spf[j] == j {
                        spf[j] = i;
                    }
                    j += i;
                }
            }
            i += 1;
        }
        let mut primes: HashSet<i32> = HashSet::new();
        for &value in &nums {
            let mut rest = value as usize;
            while rest > 1 {
                let p = spf[rest];
                primes.insert(p as i32);
                while rest % p == 0 {
                    rest /= p;
                }
            }
        }
        primes.len() as i32
    }
}
