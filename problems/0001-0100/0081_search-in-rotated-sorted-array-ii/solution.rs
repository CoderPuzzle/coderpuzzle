impl Solution {
    pub fn search(nums: Vec<i32>, target: i32) -> bool {
        let mut lo = 0;
        let mut hi = nums.len() as i32 - 1;
        while lo <= hi {
            let mid = (lo + hi) / 2;
            if nums[mid as usize] == target {
                return true;
            }
            if nums[lo as usize] == nums[mid as usize] && nums[mid as usize] == nums[hi as usize] {
                // An equal run may straddle the pivot, so neither comparison
                // below can tell which half is sorted. nums[lo] equals
                // nums[mid] and was just shown != target, so dropping index
                // lo keeps the answer while strictly shrinking the window.
                lo += 1;
            } else if nums[lo as usize] <= nums[mid as usize] {
                // Left half is sorted: a target inside its value range can
                // only lie there.
                if nums[lo as usize] <= target && target < nums[mid as usize] {
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            } else {
                // Right half is sorted; the mirror argument applies.
                if nums[mid as usize] < target && target <= nums[hi as usize] {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
        }
        false
    }
}
