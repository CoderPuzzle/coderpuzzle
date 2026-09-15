impl Solution {
    pub fn max_font(text: String, w: i32, h: i32, fonts: Vec<i32>, widths: Vec<Vec<i32>>, heights: Vec<i32>) -> i32 {
        // Fit is monotonic in the font index (widths/heights only grow), so
        // binary search the boundary between fitting and not fitting.
        let bytes = text.as_bytes();
        let fits = |index: usize| -> bool {
            if heights[index] > h {
                return false;
            }
            let row = &widths[index];
            let mut total: i64 = 0;
            for &b in bytes {
                total += row[(b - b'a') as usize] as i64;
                if total > w as i64 {
                    return false;
                }
            }
            true
        };

        if fonts.is_empty() {
            return -1;
        }

        let mut lo: i64 = 0;
        let mut hi: i64 = fonts.len() as i64 - 1;
        let mut answer = -1;
        while lo <= hi {
            let mid = lo + (hi - lo) / 2;
            if fits(mid as usize) {
                answer = fonts[mid as usize];
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        answer
    }
}
