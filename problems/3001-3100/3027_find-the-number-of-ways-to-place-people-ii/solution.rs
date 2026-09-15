impl Solution {
    pub fn number_of_pairs(mut points: Vec<Vec<i32>>) -> i32 {
        // x ascending, x-ties by y descending: every candidate lower-right
        // corner of an upper-left anchor lives at a later index, and so
        // does every potential blocker of such a pair.
        points.sort_by(|a, b| a[0].cmp(&b[0]).then(b[1].cmp(&a[1])));
        let n = points.len();
        let mut total = 0;
        for i in 0..n {
            let top = points[i][1];
            // Tallest y seen so far that does not exceed top; a candidate
            // at height y is valid exactly when window < y.
            let mut window = i32::MIN;
            for p in &points[i + 1..] {
                let y = p[1];
                if y > top {
                    continue;
                }
                if window < y {
                    total += 1;
                }
                window = window.max(y);
            }
        }
        total
    }
}
