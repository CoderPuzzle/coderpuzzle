use std::collections::HashMap;

impl Solution {
    pub fn min_area_free_rect(points: Vec<Vec<i32>>) -> f64 {
        // A quadrilateral is a rectangle exactly when its two diagonals
        // bisect each other (shared midpoint) and have equal length:
        // bisection makes it a parallelogram, and equal diagonals make a
        // parallelogram rectangular. So every pair of points is hashed as a
        // candidate diagonal, and a match hands over both diagonals of a
        // rectangle whose four corners are all present. The doubled
        // midpoint (x1 + x2, y1 + y2) — integral even when the true
        // midpoint is half-integral — packs into one i64 key as
        // (x1 + x2) * 80001 + (y1 + y2); the squared diagonal length rides
        // along inside each bucket entry.
        let mut diagonals: HashMap<i64, Vec<(i64, i64, i64)>> = HashMap::new();
        let n = points.len();
        let mut best2: i64 = 0;
        for i in 0..n {
            let (x1, y1) = (points[i][0] as i64, points[i][1] as i64);
            for j in (i + 1)..n {
                let (x2, y2) = (points[j][0] as i64, points[j][1] as i64);
                let (dx, dy) = (x1 - x2, y1 - y2);
                let center = (x1 + x2) * 80001 + (y1 + y2);
                let length2 = dx * dx + dy * dy;
                let bucket = diagonals.entry(center).or_default();
                for &(rx, ry, rlength2) in bucket.iter() {
                    if rlength2 != length2 {
                        continue; // shared midpoint, different diagonal length
                    }
                    // The stored endpoint r marks one diagonal; its
                    // reflection through the shared midpoint marks the
                    // other. The rectangle's sides at (x1, y1) run to r and
                    // to that reflection, whose offset is (x2 - rx, y2 - ry).
                    let (ux, uy) = (rx - x1, ry - y1);
                    let (vx, vy) = (x2 - rx, y2 - ry);
                    let area2 = (ux * ux + uy * uy) * (vx * vx + vy * vy);
                    if best2 == 0 || area2 < best2 {
                        best2 = area2;
                    }
                }
                bucket.push((x1, y1, length2));
            }
        }
        // A lattice rectangle's area is always an integer — perpendicular
        // integer side vectors make the product of squared side lengths a
        // perfect square — and at most (4 * 10^4)^2 = 1.6 * 10^9, so the
        // squared area is an i64 of at most 2.56 * 10^18 whose root is
        // recovered exactly: an f64 rounds such a value by at most 256,
        // the square root then sits within 2 * 10^-7 of the integer area,
        // and rounding snaps onto it.
        (best2 as f64).sqrt().round()
    }
}
