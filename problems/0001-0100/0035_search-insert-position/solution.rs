impl Solution {
    pub fn search_insert(nums: Vec<i32>, target: i32) -> i32 {
        // Lower bound over the half-open range [lo, hi): the first index whose
        // value is >= target. Present or absent, that index is the answer.
        let mut lo = 0;
        let mut hi = nums.len();
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if nums[mid] < target {
                // Too small: the answer sits strictly right of mid.
                lo = mid + 1;
            } else {
                // nums[mid] >= target keeps mid a live candidate.
                hi = mid;
            }
        }
        lo as i32
    }
}
