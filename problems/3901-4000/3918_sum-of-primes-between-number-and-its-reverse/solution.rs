impl Solution {
    pub fn sum_of_primes_in_range(n: i32) -> i32 {
        let limit = 1000usize;
        let mut is_prime = vec![true; limit + 1];
        is_prime[0] = false;
        is_prime[1] = false;
        let mut p = 2usize;
        while p * p <= limit {
            if is_prime[p] {
                let mut multiple = p * p;
                while multiple <= limit {
                    is_prime[multiple] = false;
                    multiple += p;
                }
            }
            p += 1;
        }

        let mut prefix = vec![0; limit + 1];
        for value in 1..=limit {
            prefix[value] = prefix[value - 1] + if is_prime[value] { value as i32 } else { 0 };
        }

        let mut reverse = 0i32;
        let mut remaining = n;
        while remaining > 0 {
            reverse = reverse * 10 + remaining % 10;
            remaining /= 10;
        }
        prefix[reverse.max(n) as usize] - prefix[reverse.min(n) as usize - 1]
    }
}
