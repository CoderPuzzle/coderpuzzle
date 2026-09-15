impl Solution {
    pub fn min_cost_connect_points(points: Vec<Vec<i32>>) -> i64 {
        let n = points.len();
        if n <= 1 {
            return 0;
        }
        let inf = i64::MAX;
        // best[v]: cheapest Manhattan distance from any tree vertex to the
        // outside vertex v; best[0] = 0 makes the seed point free.
        let mut best = vec![inf; n];
        best[0] = 0;
        let mut used = vec![false; n];
        let mut total: i64 = 0;
        for _ in 0..n {
            // Cheapest edge leaving the current tree — safe to add by
            // Prim's cut property.
            let mut u: usize = usize::MAX;
            for v in 0..n {
                if !used[v] && (u == usize::MAX || best[v] < best[u]) {
                    u = v;
                }
            }
            total += best[u];
            used[u] = true;
            // Relax every outside vertex against the newly attached u.
            for v in 0..n {
                if !used[v] {
                    let d = ((points[u][0] - points[v][0]).abs() as i64) + ((points[u][1] - points[v][1]).abs() as i64);
                    if d < best[v] {
                        best[v] = d;
                    }
                }
            }
        }
        total
    }
}
