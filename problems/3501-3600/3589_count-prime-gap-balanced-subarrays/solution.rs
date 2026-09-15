use std::collections::VecDeque;

impl Solution {
    pub fn prime_subarray(nums: Vec<i32>, k: i32) -> i32 {
        // Sieve, then slide a window whose spread is taken over prime
        // values alone: two monotonic deques of prime positions expose the
        // window's min/max prime, and lo is the minimal left end whose
        // prime spread is <= k. Widening leftward only adds primes, so the
        // starts that keep the spread <= k form a suffix; starts that keep
        // at least two primes inside form a prefix ending at prev2, the
        // second-to-last prime position at or before the right end. The
        // two ranges intersect in [lo, prev2], and each start there yields
        // one balanced subarray ending here — add its length per right end.
        let limit = *nums.iter().max().unwrap() as usize;
        let mut is_prime = vec![false; limit + 1];
        for value in 2..=limit {
            is_prime[value] = true;
        }
        let mut value = 2usize;
        while value * value <= limit {
            if is_prime[value] {
                let mut multiple = value * value;
                while multiple <= limit {
                    is_prime[multiple] = false;
                    multiple += value;
                }
            }
            value += 1;
        }
        let mut total: i64 = 0;
        let mut lo: usize = 0;
        let mut prev1: i32 = -1; // last prime position at or before i
        let mut prev2: i32 = -1; // second-to-last prime position at or before i
        let mut mins: VecDeque<usize> = VecDeque::new(); // values rising
        let mut maxs: VecDeque<usize> = VecDeque::new(); // values falling
        for i in 0..nums.len() {
            if is_prime[nums[i] as usize] {
                while let Some(&back) = mins.back() {
                    if nums[back] < nums[i] {
                        break;
                    }
                    mins.pop_back();
                }
                mins.push_back(i);
                while let Some(&back) = maxs.back() {
                    if nums[back] > nums[i] {
                        break;
                    }
                    maxs.pop_back();
                }
                maxs.push_back(i);
                prev2 = prev1;
                prev1 = i as i32;
            }
            if prev2 >= 0 {
                while nums[*maxs.front().unwrap()] - nums[*mins.front().unwrap()] > k {
                    if *mins.front().unwrap() as i32 == lo as i32 {
                        mins.pop_front();
                    }
                    if *maxs.front().unwrap() as i32 == lo as i32 {
                        maxs.pop_front();
                    }
                    lo += 1;
                }
                if prev2 >= lo as i32 {
                    total += (prev2 - lo as i32 + 1) as i64;
                }
            }
        }
        total as i32
    }
}
