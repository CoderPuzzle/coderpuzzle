impl Solution {
    pub fn find_closest_elements(arr: Vec<i32>, k: i32, x: i32) -> Vec<i32> {
        let k = k as usize;
        // The k closest elements form a contiguous block, so binary search the
        // block's start over [0, n - k].
        let mut lo = 0usize;
        let mut hi = arr.len() - k;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            // Compare the kept left edge arr[mid] with arr[mid + k], the first
            // excluded element: if the excluded one is strictly closer, this
            // start (and every earlier one) is beatable.
            if x - arr[mid] > arr[mid + k] - x {
                lo = mid + 1;
            } else {
                // Left is at least as close; ties keep the smaller elements here.
                hi = mid;
            }
        }
        arr[lo..lo + k].to_vec()
    }
}
