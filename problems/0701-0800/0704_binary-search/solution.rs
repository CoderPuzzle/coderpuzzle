impl Solution {
    pub fn search(nums: Vec<i32>, target: i32) -> i32 {
        // Invariant: if the target exists, its index stays inside nums[lo..hi].
        let mut lo = 0i32;
        let mut hi = nums.len() as i32 - 1;
        while lo <= hi {
            let mid = lo + (hi - lo) / 2;
            if nums[mid as usize] == target {
                return mid;
            }
            // Each update also discards mid itself, so the interval at least
            // halves and the loop always terminates.
            if nums[mid as usize] < target {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        // Bounds crossed: the candidate interval is empty, target absent.
        -1
    }
}
