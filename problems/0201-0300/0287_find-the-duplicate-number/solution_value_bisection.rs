impl Solution {
    pub fn find_duplicate(nums: Vec<i32>) -> i32 {
        // Bisect the value range 1..n instead of chasing pointers: count(x),
        // the number of entries <= x, exceeds x exactly when the duplicate
        // is <= x, so the smallest overloaded value is the answer.
        let n = nums.len() as i32 - 1;
        let mut lo = 1i32;
        let mut hi = n;
        while lo < hi {
            let mid = (lo + hi) / 2;
            // Pigeonhole: at most mid entries can be <= mid while all their
            // values are distinct, so an excess count pins the repeat to the
            // lower half and a shortfall pins it above mid.
            let count = nums.iter().filter(|&&value| value <= mid).count();
            if count > mid as usize {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        // The bounds meet on the repeated value.
        lo
    }
}
