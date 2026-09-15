impl Solution {
    pub fn image_smoother(img: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Each output cell averages the 3x3 window around it, clamped to the
        // matrix, so border cells average fewer than nine values; writing
        // into a fresh matrix keeps every window reading unsmoothed input.
        let m = img.len();
        let n = img[0].len();
        let mut smoothed = vec![vec![0; n]; m];
        // The window rows run from i.saturating_sub(1) to (i + 2).min(m) and
        // the columns likewise; summing in integers and floor-dividing by the
        // count is the rounding-down average (values are non-negative).
        for i in 0..m {
            for j in 0..n {
                let mut total = 0;
                let mut count = 0;
                for r in i.saturating_sub(1)..(i + 2).min(m) {
                    for c in j.saturating_sub(1)..(j + 2).min(n) {
                        total += img[r][c];
                        count += 1;
                    }
                }
                smoothed[i][j] = total / count;
            }
        }
        smoothed
    }
}
