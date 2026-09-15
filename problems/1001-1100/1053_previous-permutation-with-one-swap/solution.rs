impl Solution {
    pub fn prev_perm_opt1(arr: Vec<i32>) -> Vec<i32> {
        let mut arr = arr;
        let n = arr.len();
        // Rightmost index i with arr[i] > arr[i + 1]: everything after it
        // is already non-decreasing, so i is the latest position whose
        // value can still be lowered by a single swap.
        let mut i: i32 = -1;
        for k in (0..n.saturating_sub(1)).rev() {
            if arr[k] > arr[k + 1] {
                i = k as i32;
                break;
            }
        }
        if i == -1 {
            return arr;
        }
        let i = i as usize;
        // Track the largest value strictly less than arr[i]; scanning
        // left to right and updating only on a strictly larger candidate
        // keeps the leftmost occurrence of that maximum among ties, which
        // is what maximizes the resulting array.
        let mut j: i32 = -1;
        let mut best = -1;
        for k in (i + 1)..n {
            if arr[k] < arr[i] && arr[k] > best {
                best = arr[k];
                j = k as i32;
            }
        }
        let j = j as usize;
        arr.swap(i, j);
        arr
    }
}
