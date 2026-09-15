impl Solution {
    pub fn num_prime_arrangements(n: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;

        // Sieve of Eratosthenes up to n.
        let mut is_prime = vec![true; n + 1];
        is_prime[0] = false;
        if n >= 1 {
            is_prime[1] = false;
        }
        let mut p = 2usize;
        while p * p <= n {
            if is_prime[p] {
                let mut multiple = p * p;
                while multiple <= n {
                    is_prime[multiple] = false;
                    multiple += p;
                }
            }
            p += 1;
        }
        let primes = is_prime.iter().filter(|&&v| v).count();

        // Primes may permute over prime indices; everything else (1 and
        // the composites) permutes over the rest. Independent choices.
        let mut result: i64 = 1;
        for k in 2..=primes {
            result = result * k as i64 % MOD;
        }
        for k in 2..=(n - primes) {
            result = result * k as i64 % MOD;
        }
        result as i32
    }
}
