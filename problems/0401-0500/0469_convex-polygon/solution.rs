impl Solution {
    // A convex polygon turns the same way at every vertex: the cross product
    // of the incoming and outgoing edge vectors is positive at every left
    // turn or negative at every right turn, so one sign of each anywhere is
    // a refutation.
    pub fn is_convex(points: Vec<Vec<i32>>) -> bool {
        let n = points.len();
        let mut positive = false;
        let mut negative = false;
        for i in 0..n {
            let prev = &points[(i + n - 1) % n];
            let cur = &points[i];
            let next = &points[(i + 1) % n];
            let x1 = (cur[0] - prev[0]) as i64;
            let y1 = (cur[1] - prev[1]) as i64;
            let x2 = (next[0] - cur[0]) as i64;
            let y2 = (next[1] - cur[1]) as i64;
            // z == 0 means three consecutive vertices are collinear — legal
            // along an edge, so it votes for neither side.
            let z = x1 * y2 - y1 * x2;
            if z > 0 {
                positive = true;
            } else if z < 0 {
                negative = true;
            }
            if positive && negative {
                return false;
            }
        }
        true
    }
}
