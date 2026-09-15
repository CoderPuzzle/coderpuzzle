impl Solution {
    // Unbounded knapsack over the first m primes: dp[i] = fewest primes
    // whose sum is exactly i. Only primes <= n can ever contribute.
    pub fn min_number_of_primes(n: i32, m: i32) -> i32 {
        let mut primes: Vec<i32> = Vec::new();
        let mut value = 2;
        while (primes.len() as i32) < m {
            if primes.iter().all(|p| value % p != 0) {
                primes.push(value);
            }
            value += 1;
        }
        let inf = n + 1;
        let mut dp = vec![inf; n as usize + 1];
        dp[0] = 0;
        for total in 1..=n {
            for &p in &primes {
                if p <= total && dp[(total - p) as usize] + 1 < dp[total as usize] {
                    dp[total as usize] = dp[(total - p) as usize] + 1;
                }
            }
        }
        if dp[n as usize] == inf {
            -1
        } else {
            dp[n as usize]
        }
    }
}
