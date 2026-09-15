impl Solution {
    pub fn search_range(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // The run of targets starts at the first index >= target...
        let start = lower_bound(&nums, target as i64);
        if start == nums.len() || nums[start] != target {
            return vec![-1, -1];
        }
        // ...and ends one slot before the first index >= target + 1: the
        // upper bound of target is exactly the lower bound of target + 1.
        vec![start as i32, lower_bound(&nums, target as i64 + 1) as i32 - 1]
    }
}

// Smallest index whose value is >= limit; nums.len() if none. The kept half
// always contains that boundary, so the window halves until only the boundary
// is left. The limit is 64-bit because target + 1 can be one past i32::MAX.
fn lower_bound(nums: &[i32], limit: i64) -> usize {
    let mut lo = 0;
    let mut hi = nums.len();
    while lo < hi {
        let mid = (lo + hi) / 2;
        if (nums[mid] as i64) < limit {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    lo
}
