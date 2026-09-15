use std::collections::HashMap;

impl Solution {
    pub fn count_trapezoids(points: Vec<Vec<i32>>) -> i64 {
        // Hash every segment by its sign-fixed reduced slope, and within
        // a slope by its line intercept: two segments sharing a slope but
        // lying on different lines never share an endpoint and always
        // span a convex quadrilateral, while same-line pairs are
        // degenerate. Per slope the valid base-pairs are C(m,2) minus the
        // same-line C(c,2) sums. A parallelogram has two parallel-side
        // pairs and is therefore counted in two slope buckets; hashing
        // segments by diagonal midpoint (excluding equal-slope pairs,
        // i.e. collinear quadruples) counts each parallelogram exactly
        // once, so one subtraction makes every convex quad with parallel
        // sides count once. Bucket counts reach C(125000, 2) ~ 7.8e9, so
        // i64 math is required.
        let n = points.len();
        let mut slope_lines: HashMap<(i32, i32), HashMap<i32, i32>> = HashMap::new();
        let mut mid_slopes: HashMap<(i32, i32), HashMap<(i32, i32), i32>> = HashMap::new();
        for i in 0..n {
            for j in i + 1..n {
                let (x1, y1) = (points[i][0], points[i][1]);
                let (x2, y2) = (points[j][0], points[j][1]);
                let (mut dx, mut dy) = (x2 - x1, y2 - y1);
                let g = gcd(dx.abs(), dy.abs());
                dx /= g;
                dy /= g;
                if dx < 0 || (dx == 0 && dy < 0) {
                    dx = -dx;
                    dy = -dy;
                }
                *slope_lines
                    .entry((dy, dx))
                    .or_default()
                    .entry(dx * y1 - dy * x1)
                    .or_insert(0) += 1;
                *mid_slopes
                    .entry((x1 + x2, y1 + y2))
                    .or_default()
                    .entry((dy, dx))
                    .or_insert(0) += 1;
            }
        }
        let mut total: i64 = 0;
        for lines in slope_lines.values() {
            let m: i64 = lines.values().map(|&c| c as i64).sum();
            total += m * (m - 1) / 2;
            for &c in lines.values() {
                total -= c as i64 * (c as i64 - 1) / 2;
            }
        }
        let mut parallelograms: i64 = 0;
        for slopes in mid_slopes.values() {
            let c: i64 = slopes.values().map(|&s| s as i64).sum();
            parallelograms += c * (c - 1) / 2;
            for &s in slopes.values() {
                parallelograms -= s as i64 * (s as i64 - 1) / 2;
            }
        }
        total - parallelograms
    }
}

fn gcd(a: i32, b: i32) -> i32 {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}
