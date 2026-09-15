impl Solution {
    pub fn search(nums: Vec<i32>, target: i32) -> i32 {
        // Invariant binary search can still ride on: inside any window
        // [lo, hi], the midpoint splits it into two halves and at least one
        // half is properly sorted.
        let mut lo = 0i32;
        let mut hi = nums.len() as i32 - 1;
        while lo <= hi {
            let mid = (lo + hi) / 2;
            let mid_u = mid as usize;
            if nums[mid_u] == target {
                return mid;
            }
            // <= (not <) matters for the degenerate window where lo and mid
            // coincide; an unrotated array simply always picks left.
            if nums[lo as usize] <= nums[mid_u] {
                // Left half is sorted, so its value range is exactly known:
                // one containment test decides whether target can live there.
                if nums[lo as usize] <= target && target < nums[mid_u] {
                    hi = mid - 1;
                } else {
                    // Not in the sorted half, so target -- if present --
                    // must be in the other half.
                    lo = mid + 1;
                }
            } else {
                // Right half is the sorted one; same containment logic.
                if nums[mid_u] < target && target <= nums[hi as usize] {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
        }
        // Window emptied without a hit; distinct values keep the range tests
        // from ever straddling the rotation point ambiguously.
        -1
    }
}
