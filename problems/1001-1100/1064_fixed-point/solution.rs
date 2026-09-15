impl Solution {
    pub fn fixed_point(arr: Vec<i32>) -> i32 {
        let mut lo = 0i32;
        let mut hi = arr.len() as i32 - 1;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if arr[mid as usize] - mid >= 0 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        if arr[lo as usize] == lo {
            lo
        } else {
            -1
        }
    }
}
