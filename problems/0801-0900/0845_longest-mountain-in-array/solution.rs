impl Solution {
    pub fn longest_mountain(arr: Vec<i32>) -> i32 {
        // One pass over the peaks: an index is a peak when it strictly
        // beats both neighbors; expand each slope while it stays strict.
        let n = arr.len();
        let mut best = 0;
        let mut i = 1;
        while i + 1 < n {
            if arr[i - 1] < arr[i] && arr[i] > arr[i + 1] {
                let mut left = i - 1;
                // Walk down the ascent while it keeps rising strictly.
                while left > 0 && arr[left - 1] < arr[left] {
                    left -= 1;
                }
                let mut right = i + 1;
                // Walk down the descent while it keeps falling strictly.
                while right + 1 < n && arr[right] > arr[right + 1] {
                    right += 1;
                }
                best = best.max((right - left + 1) as i32);
                // The next peak lies strictly past this descent's floor.
                i = right + 1;
            } else {
                i += 1;
            }
        }
        best
    }
}
