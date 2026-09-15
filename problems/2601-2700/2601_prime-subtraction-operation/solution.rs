impl Solution {
    pub fn prime_sub_operation(nums: Vec<i32>) -> bool {
        // Sieve once up to max(nums): every usable prime sits below nums[i].
        // Greedy left to right, keeping prev = smallest feasible prefix end
        // — a smaller prefix end never constrains later elements more, so
        // committing greedily stays optimal.
        let limit = *nums.iter().max().unwrap() as usize;
        let mut composite = vec![false; limit + 1];
        let mut primes = Vec::new();
        for i in 2..=limit {
            if !composite[i] {
                primes.push(i as i32);
                let mut j = i * i;
                while j <= limit {
                    composite[j] = true;
                    j += i;
                }
            }
        }
        let mut prev = 0;
        for &x in &nums {
            // Want the largest prime p with p < x and x - p > prev, which is
            // the largest p <= x - prev - 1 (always < x). Subtracting it then
            // beats leaving x untouched, since the result is smaller yet still
            // above prev. partition_point locates that prime in O(log pi).
            let bound = x - prev - 1;
            let index = primes.partition_point(|&p| p <= bound);
            if index > 0 {
                prev = x - primes[index - 1];
            } else if x > prev {
                prev = x;
            } else {
                return false;
            }
        }
        true
    }
}
