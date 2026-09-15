impl Solution {
    pub fn split_array(nums: Vec<i32>) -> i64 {
        // Sieve of Eratosthenes marks which indices are prime in
        // O(n log log n); a single pass then routes each element to A or B.
        let n = nums.len();
        let mut is_prime = vec![true; n];
        if n > 0 {
            is_prime[0] = false;
        }
        if n > 1 {
            is_prime[1] = false;
        }
        let mut p = 2;
        while p * p < n {
            if is_prime[p] {
                let mut multiple = p * p;
                while multiple < n {
                    is_prime[multiple] = false;
                    multiple += p;
                }
            }
            p += 1;
        }

        let mut sum_a = 0i64;
        let mut sum_b = 0i64;
        for (index, &value) in nums.iter().enumerate() {
            if is_prime[index] {
                sum_a += i64::from(value);
            } else {
                sum_b += i64::from(value);
            }
        }
        // |sum(A) - sum(B)| can reach ~1e14, so the sums are i64.
        (sum_a - sum_b).abs()
    }
}
