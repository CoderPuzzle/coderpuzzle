impl Solution {
    pub fn maximum_prime_difference(nums: Vec<i32>) -> i32 {
        // One pass keeping the first and the last prime-bearing index; the
        // answer is their distance. Primality by trial division is cheap
        // because values never exceed 100 (at most 9 divisor probes).
        let is_prime = |v: i32| -> bool {
            if v < 2 {
                return false;
            }
            let mut d = 2;
            while d * d <= v {
                if v % d == 0 {
                    return false;
                }
                d += 1;
            }
            true
        };
        let mut first: i32 = -1;
        let mut last: i32 = -1;
        for (i, &v) in nums.iter().enumerate() {
            if !is_prime(v) {
                continue;
            }
            if first == -1 {
                first = i as i32;
            }
            last = i as i32;
        }
        last - first
    }
}
