impl Solution {
    pub fn contains_pattern(arr: Vec<i32>, m: i32, k: i32) -> bool {
        let n = arr.len() as i64;
        // Not even one m-length block can repeat k times if there isn't
        // room for m * k elements.
        if n < (m as i64) * (k as i64) {
            return false;
        }
        let m = m as usize;
        let need = m * ((k - 1) as usize);
        let mut run = 0usize;
        // arr[i] == arr[i - m] means position i continues whatever block
        // started m slots earlier; run counts how many positions in a row
        // have done that. Once run reaches m * (k - 1) the block ending
        // just before this run has repeated k times back to back.
        for i in m..arr.len() {
            if arr[i] == arr[i - m] {
                run += 1;
                if run == need {
                    return true;
                }
            } else {
                run = 0;
            }
        }
        false
    }
}
