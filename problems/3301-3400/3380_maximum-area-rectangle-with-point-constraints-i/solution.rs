impl Solution {
    pub fn max_rectangle_area(points: Vec<Vec<i32>>) -> i32 {
        // Enumerate every quadruple. Four distinct points are the corners
        // of an axis-aligned rectangle exactly when they use two distinct x
        // values and two distinct y values — the four (x, y) combos then
        // each hold one of the points. The rectangle survives only if every
        // other point lies outside its closed box; with n <= 10 there are
        // at most C(10,4) = 210 quads, each checked in a linear scan.
        let n = points.len();
        let mut best = -1;
        for i in 0..n {
            for j in i + 1..n {
                for k in j + 1..n {
                    for l in k + 1..n {
                        let quad = [&points[i], &points[j], &points[k], &points[l]];
                        let mut xs: Vec<i32> = quad.iter().map(|p| p[0]).collect();
                        let mut ys: Vec<i32> = quad.iter().map(|p| p[1]).collect();
                        xs.sort_unstable();
                        ys.sort_unstable();
                        xs.dedup();
                        ys.dedup();
                        if xs.len() != 2 || ys.len() != 2 {
                            continue;
                        }
                        let (x1, x2) = (xs[0], xs[1]);
                        let (y1, y2) = (ys[0], ys[1]);
                        let blocked = points.iter().any(|p| {
                            !quad.iter().any(|q| q[0] == p[0] && q[1] == p[1])
                                && x1 <= p[0]
                                && p[0] <= x2
                                && y1 <= p[1]
                                && p[1] <= y2
                        });
                        if !blocked {
                            best = best.max((x2 - x1) * (y2 - y1));
                        }
                    }
                }
            }
        }
        best
    }
}
