impl Solution {
    pub fn duplicate_zeros(arr: Vec<i32>) -> Vec<i32> {
        // Two-pointer write from the end: every element is written to a
        // position at or to the right of its source, so no unread value is
        // ever overwritten. i reads the original array, j writes into the
        // extended one; writes with j beyond the real length fall off.
        let mut arr = arr;
        let n = arr.len();
        let zeros = arr.iter().filter(|&&v| v == 0).count();
        let mut i = n as i64 - 1;
        let mut j = n as i64 + zeros as i64 - 1;
        while i >= 0 {
            if (j as usize) < n {
                arr[j as usize] = arr[i as usize];
            }
            j -= 1;
            if arr[i as usize] == 0 {
                if (j as usize) < n {
                    arr[j as usize] = 0;
                }
                j -= 1;
            }
            i -= 1;
        }
        arr
    }
}
