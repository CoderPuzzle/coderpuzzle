impl Solution {
    pub fn find_min(nums: Vec<i32>) -> i32 {
        let mut lo = 0usize;
        let mut hi = nums.len() - 1;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            // Compare against the right end: a live window endpoint whose
            // verdict stays correct even when the array was not rotated.
            if nums[mid] > nums[hi] {
                // The drop (start of the second ascending run) is right of mid.
                lo = mid + 1;
            } else {
                // mid..hi is non-decreasing: the minimum is at mid or left.
                hi = mid;
            }
        }
        // lo and hi meet on the single survivor.
        nums[lo]
    }
}
