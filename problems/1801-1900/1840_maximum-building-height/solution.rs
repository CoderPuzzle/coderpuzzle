impl Solution {
    // Only restricted points (plus building 1 at height 0) matter. Sort
    // by id; two passes make each cap consistent with reachability from
    // its neighbors; between consecutive pinned points the best peak is
    // the floor of (lh + rh + gap) / 2, and past the last pin the height
    // simply ramps to its cap + distance.
    pub fn max_building(n: i32, restrictions: Vec<Vec<i32>>) -> i32 {
        let mut points: Vec<(i64, i64)> = Vec::with_capacity(restrictions.len() + 1);
        points.push((1, 0));
        for r in &restrictions {
            points.push((r[0] as i64, r[1] as i64));
        }
        points.sort_unstable();
        for k in 1..points.len() {
            let reachable = points[k - 1].1 + (points[k].0 - points[k - 1].0);
            if reachable < points[k].1 {
                points[k].1 = reachable;
            }
        }
        for k in (0..points.len() - 1).rev() {
            let reachable = points[k + 1].1 + (points[k + 1].0 - points[k].0);
            if reachable < points[k].1 {
                points[k].1 = reachable;
            }
        }
        let mut best = 0i64;
        for k in 1..points.len() {
            let gap = points[k].0 - points[k - 1].0;
            best = best.max((points[k - 1].1 + points[k].1 + gap) / 2);
        }
        let last = *points.last().unwrap();
        best.max(last.1 + (n as i64 - last.0)) as i32
    }
}
