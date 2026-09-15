impl Solution {
    pub fn missing_element(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        // A gapless array would have nums[i] = nums[0] + i, so missing(i)
        // counts the values absent before nums[i]; it is non-decreasing.
        let missing = |i: usize| nums[i] - nums[0] - i as i32;
        // Whole array holds fewer than k missing numbers: answer lies beyond
        // the last element.
        if missing(n - 1) < k {
            return nums[n - 1] + (k - missing(n - 1));
        }
        // First index whose missing count reaches k; missing(0) = 0 < k keeps
        // lo >= 1, so lo - 1 is always valid.
        let (mut lo, mut hi) = (0usize, n - 1);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if missing(mid) >= k {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        // The kth missing number sits in the gap right after nums[lo-1].
        nums[lo - 1] + (k - missing(lo - 1))
    }
}
