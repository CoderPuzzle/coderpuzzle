impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        // Sieve of Eratosthenes up to a fixed bound. Every nums[i] is at
        // most 1e5, and the largest prime gap below 1e5 is far smaller
        // than the margin, so the next prime (or next non-prime) after
        // any element always lies inside the table.
        let limit = 300000usize;
        let mut is_prime = vec![true; limit + 1];
        is_prime[0] = false;
        is_prime[1] = false;
        let mut p = 2;
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

        let mut total: i64 = 0;
        for (i, &original) in nums.iter().enumerate() {
            let mut x = original as usize;
            if i % 2 == 0 {
                while !is_prime[x] {
                    x += 1;
                }
            } else {
                while is_prime[x] {
                    x += 1;
                }
            }
            total += x as i64 - original as i64;
        }
        total as i32
    }
}
