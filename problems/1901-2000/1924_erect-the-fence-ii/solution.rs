impl Solution {
    fn inside(c: [f64; 3], x: f64, y: f64) -> bool {
        let dx = x - c[0];
        let dy = y - c[1];
        dx * dx + dy * dy <= c[2] + 1e-7
    }

    // Circle with the two points as diameter: midpoint center, squared radius = d^2/4.
    fn from2(ax: f64, ay: f64, bx: f64, by: f64) -> [f64; 3] {
        let cx = (ax + bx) / 2.0;
        let cy = (ay + by) / 2.0;
        let dx = ax - bx;
        let dy = ay - by;
        [cx, cy, (dx * dx + dy * dy) / 4.0]
    }

    fn from3(ax: f64, ay: f64, bx: f64, by: f64, cx: f64, cy: f64) -> [f64; 3] {
        let d = 2.0 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
        // Zero determinant = collinear, no circumcircle; the best two-point
        // circle among the pairs is the correct enclosing circle.
        if d == 0.0 {
            let pairs = [
                Self::from2(ax, ay, bx, by),
                Self::from2(ax, ay, cx, cy),
                Self::from2(bx, by, cx, cy),
            ];
            let mut best = pairs[0];
            for cand in pairs {
                if cand[2] < best[2] {
                    best = cand;
                }
            }
            return best;
        }
        // Circumcenter via the perpendicular-bisector linear system.
        let aa = ax * ax + ay * ay;
        let bb = bx * bx + by * by;
        let cc = cx * cx + cy * cy;
        let ux = (aa * (by - cy) + bb * (cy - ay) + cc * (ay - by)) / d;
        let uy = (aa * (cx - bx) + bb * (ax - cx) + cc * (bx - ax)) / d;
        let dx = ax - ux;
        let dy = ay - uy;
        [ux, uy, dx * dx + dy * dy]
    }

    // Translate by the first tree before converting to floats: small
    // intermediate magnitudes protect the 1e-5 judge tolerance.
    pub fn outer_trees(trees: Vec<Vec<i32>>) -> Vec<f64> {
        let n = trees.len();
        let ox = trees[0][0] as f64;
        let oy = trees[0][1] as f64;
        let mut xs = vec![0.0; n];
        let mut ys = vec![0.0; n];
        for i in 0..n {
            xs[i] = trees[i][0] as f64 - ox;
            ys[i] = trees[i][1] as f64 - oy;
        }
        // Welzl's argument: a point outside the current circle must lie ON the
        // border of the corrected circle — fix i and rebuild one level deeper
        // (j escaping fixes a second border point, k escaping fixes all three).
        let mut circle = [xs[0], ys[0], 0.0];
        for i in 1..n {
            if Self::inside(circle, xs[i], ys[i]) {
                continue;
            }
            circle = [xs[i], ys[i], 0.0];
            for j in 0..i {
                if Self::inside(circle, xs[j], ys[j]) {
                    continue;
                }
                circle = Self::from2(xs[i], ys[i], xs[j], ys[j]);
                for k in 0..j {
                    if Self::inside(circle, xs[k], ys[k]) {
                        continue;
                    }
                    circle = Self::from3(xs[i], ys[i], xs[j], ys[j], xs[k], ys[k]);
                }
            }
        }
        vec![circle[0] + ox, circle[1] + oy, circle[2].sqrt()]
    }
}
