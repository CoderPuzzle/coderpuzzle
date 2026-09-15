impl Solution {
    pub fn peak_index_in_mountain_array(arr: Vec<i32>) -> i32 {
        // Binary search on the slope: a rise past mid puts the peak to the
        // right of mid, a fall puts it at mid or to its left.
        let mut lo = 0usize;
        let mut hi = arr.len() - 1;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if arr[mid] < arr[mid + 1] {
                // Still on the ascent, so the summit lies strictly right.
                lo = mid + 1;
            } else {
                // On the summit or the descent, so mid is safe to keep.
                hi = mid;
            }
        }
        lo as i32
    }
}
