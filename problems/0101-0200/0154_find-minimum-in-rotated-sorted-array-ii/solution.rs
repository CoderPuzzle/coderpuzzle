impl Solution {
    pub fn find_min(nums: Vec<i32>) -> i32 {
        let mut lo = 0;
        let mut hi = nums.len() as i32 - 1;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if nums[mid as usize] > nums[hi as usize] {
                // A value larger than nums[hi] can only sit before the
                // rotation point, so the minimum lies strictly right of mid.
                lo = mid + 1;
            } else if nums[mid as usize] < nums[hi as usize] {
                // nums[mid..hi] is non-decreasing, so the rotation point —
                // and the minimum — is at mid or to its left; mid stays
                // a candidate.
                hi = mid;
            } else {
                // nums[mid] == nums[hi]: the equal run may straddle the
                // pivot, so neither comparison above can tell where the
                // minimum hides. nums[hi] also appears at mid, so dropping
                // index hi cannot lose the minimum while strictly
                // shrinking the window.
                hi -= 1;
            }
        }
        nums[lo as usize]
    }
}
