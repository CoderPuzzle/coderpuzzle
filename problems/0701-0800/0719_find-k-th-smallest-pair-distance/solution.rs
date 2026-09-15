impl Solution {
    pub fn smallest_distance_pair(nums: Vec<i32>, k: i32) -> i32 {
        let mut nums = nums;
        nums.sort();
        let n = nums.len();

        // Pairs within dist, counted on the sorted array with two pointers:
        // j only moves forward across the whole scan (never restarts per i).
        let count_le = |dist: i32| -> i64 {
            let mut cnt: i64 = 0;
            let mut j = 0usize;
            for i in 0..n {
                while j < n && nums[j] - nums[i] <= dist {
                    j += 1;
                }
                // Later elements within dist of nums[i]; j - i - 1 of them.
                cnt += j as i64 - i as i64 - 1;
            }
            cnt
        };

        // The count is monotone in dist, so binary search the distance itself
        // over [0, max - min]; the converged value is a real pair distance.
        let mut lo = 0i32;
        let mut hi = nums[n - 1] - nums[0];
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            // At least k pairs qualify: the kth smallest is mid or smaller.
            if count_le(mid) >= k as i64 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}
