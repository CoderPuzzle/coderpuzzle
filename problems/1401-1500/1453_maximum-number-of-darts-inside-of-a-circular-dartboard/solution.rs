impl Solution {
    pub fn num_points(darts: Vec<Vec<i32>>, r: i32) -> i32 {
        let n = darts.len();
        let mut best: i32 = 1;
        let r2 = (r as f64) * (r as f64);
        let eps = 1e-7;
        let count_at = |cx: f64, cy: f64| -> i32 {
            let mut count = 0;
            for dart in &darts {
                let dx = dart[0] as f64 - cx;
                let dy = dart[1] as f64 - cy;
                if dx * dx + dy * dy <= r2 + eps {
                    count += 1;
                }
            }
            count
        };
        for dart in &darts {
            best = best.max(count_at(dart[0] as f64, dart[1] as f64));
        }
        for i in 0..n {
            let (x1, y1) = (darts[i][0] as f64, darts[i][1] as f64);
            for j in (i + 1)..n {
                let (x2, y2) = (darts[j][0] as f64, darts[j][1] as f64);
                let dx = x2 - x1;
                let dy = y2 - y1;
                let d2 = dx * dx + dy * dy;
                if d2 == 0.0 || d2 > 4.0 * r2 {
                    continue;
                }
                let mut h2 = r2 - d2 / 4.0;
                if h2 < 0.0 {
                    h2 = 0.0;
                }
                let scale = (h2 / d2).sqrt();
                let mx = (x1 + x2) / 2.0;
                let my = (y1 + y2) / 2.0;
                for factor in [1.0, -1.0] {
                    best = best.max(count_at(mx + factor * scale * -dy, my + factor * scale * dx));
                }
            }
        }
        best
    }
}
