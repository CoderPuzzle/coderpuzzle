impl Solution {
    pub fn separate_squares(squares: Vec<Vec<i32>>) -> f64 {
        let mut total: i64 = 0; // exact integer accumulation (mirrors Python's int sum)
        let mut hi_top: i64 = i64::MIN;
        for sq in &squares {
            let l = sq[2] as i64;
            total += l * l;
            let top = sq[1] as i64 + l;
            if top > hi_top {
                hi_top = top;
            }
        }
        let target = total as f64 / 2.0;
        // area below a horizontal line is non-decreasing in its height, so
        // binary search the smallest y whose below-area reaches half the total
        let mut lo = 0.0f64;
        let mut hi = hi_top as f64;
        // 60 halvings shrink the interval well below the 1e-5 tolerance
        for _ in 0..60 {
            let mid = (lo + hi) / 2.0;
            let mut below = 0.0f64;
            // each square contributes width * height clipped to [0, l]
            for sq in &squares {
                let y = sq[1] as i64;
                let l = sq[2] as i64;
                if mid <= y as f64 {
                    continue;
                }
                let top = y + l;
                let m = if mid < top as f64 { mid } else { top as f64 };
                below += (m - y as f64) * l as f64;
            }
            // >= steers the search to the leftmost qualifying height
            if below >= target {
                hi = mid;
            } else {
                lo = mid;
            }
        }
        hi
    }
}
