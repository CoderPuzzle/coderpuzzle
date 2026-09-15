use std::collections::HashMap;

impl Solution {
    pub fn check_prime_frequency(nums: Vec<i32>) -> bool {
        // One pass counts each distinct value's frequency in a hash map,
        // then every frequency is tested for primality by trial division:
        // a factor with divisor * divisor <= frequency refutes it, 0 and 1
        // fail outright, and any frequency surviving the scan is prime.
        // Frequencies never exceed nums.length <= 100, so the checks are a
        // handful of divisions each.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for value in nums {
            *counts.entry(value).or_insert(0) += 1;
        }
        for &frequency in counts.values() {
            if frequency < 2 {
                continue;
            }
            let mut is_prime = true;
            let mut divisor = 2i32;
            while divisor * divisor <= frequency {
                if frequency % divisor == 0 {
                    is_prime = false;
                    break;
                }
                divisor += 1;
            }
            if is_prime {
                return true;
            }
        }
        false
    }
}
