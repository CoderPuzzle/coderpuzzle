impl Solution {
    pub fn kth_smallest_subarray_sum(nums: Vec<i32>, k: i32) -> i32 {
        // f(x) = number of subarrays with sum <= x. Sliding window: positivity
        // guarantees shrinking monotonically reduces the sum.
        let count_at_most = |limit: i64| -> i64 {
            let mut total: i64 = 0;
            let mut window_sum: i64 = 0;
            let mut left = 0usize;
            for right in 0..nums.len() {
                window_sum += nums[right] as i64;
                while window_sum > limit {
                    window_sum -= nums[left] as i64;
                    left += 1;
                }
                // Subarrays ending at `right` that fit: exactly the window's length.
                total += (right - left + 1) as i64;
            }
            total
        };

        let mut lo = i64::MAX;
        let mut hi: i64 = 0;
        for &value in &nums {
            lo = lo.min(value as i64);
            hi += value as i64;
        }
        // lo/hi now bracket the answer over [min element, total sum]: f is
        // non-decreasing and jumps only at real subarray sums, so the smallest x
        // with f(x) >= k IS the k-th smallest sum.
        while lo < hi {
            let mid = (lo + hi) / 2;
            if count_at_most(mid) >= k as i64 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
