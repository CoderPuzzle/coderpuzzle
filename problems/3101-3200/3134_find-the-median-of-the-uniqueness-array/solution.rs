use std::collections::HashMap;

impl Solution {
    pub fn median_of_uniqueness_array(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let length = (n as i64) * (n as i64 + 1) / 2;
        // Lower median of the virtual uniqueness array = rank (length + 1) / 2.
        let target_rank = (length + 1) / 2;

        // Count subarrays with at most x distinct values via a sliding window.
        let count_at_most = |x: usize| -> i64 {
            let mut freq: HashMap<i32, i32> = HashMap::new();
            let mut left: usize = 0;
            let mut result: i64 = 0;
            for right in 0..n {
                *freq.entry(nums[right]).or_insert(0) += 1;
                while freq.len() > x {
                    let out = nums[left];
                    left += 1;
                    if let Some(e) = freq.get_mut(&out) {
                        *e -= 1;
                        if *e == 0 {
                            freq.remove(&out);
                        }
                    }
                }
                // Every start inside the now-valid window yields a qualifying subarray.
                result += (right - left + 1) as i64;
            }
            result
        };

        // count_at_most is monotone in x, so the least x reaching the rank is the median.
        let mut lo: i64 = 1;
        let mut hi: i64 = n as i64;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if count_at_most(mid as usize) >= target_rank {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
