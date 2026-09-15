impl Solution {
    pub fn maximum_beauty(nums: Vec<i32>, k: i32) -> i32 {
        // An element can only ever take a value inside [v-k, v+k] — operating
        // moves it anywhere in that range and leaving it alone keeps it there.
        // Two elements can therefore be driven to one common value exactly
        // when their ranges intersect, i.e. their values differ by at most 2k.
        let mut arr = nums.clone();
        arr.sort_unstable();
        let mut best: usize = 1;
        let mut left = 0usize;
        for right in 0..arr.len() {
            // Shrink while the window's extremes do not share a common value;
            // once the extremes fit, every pair inside the window fits too,
            // because sorted order lets the extremes bound every difference.
            while arr[right] - arr[left] > 2 * k {
                left += 1;
            }
            // The whole window can be made equal, so its length is achievable;
            // windows only get longer by growing, never by shrinking.
            best = best.max(right - left + 1);
        }
        best as i32
    }
}
