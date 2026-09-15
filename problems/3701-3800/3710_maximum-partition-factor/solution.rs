impl Solution {
    pub fn max_partition_factor(points: Vec<Vec<i32>>) -> i32 {
        let n = points.len();
        // Both groups are singletons, so no intra-group pair exists and the
        // factor is 0 by definition.
        if n == 2 {
            return 0;
        }
        let mut dist = vec![vec![0i32; n]; n];
        for i in 0..n {
            for j in 0..n {
                dist[i][j] = (points[i][0] - points[j][0]).abs() + (points[i][1] - points[j][1]).abs();
            }
        }
        // The factor of any split is 0 or one of the inter-point distances,
        // so binary search probes those candidate thresholds only.
        let mut candidates: Vec<i32> = Vec::with_capacity(n * (n - 1) / 2 + 1);
        candidates.push(0);
        for i in 0..n {
            for j in (i + 1)..n {
                candidates.push(dist[i][j]);
            }
        }
        candidates.sort_unstable();
        candidates.dedup();

        // Raising the threshold only adds conflict edges, so feasibility is
        // monotone and the largest separable threshold is the answer.
        let (mut lo, mut hi) = (0usize, candidates.len() - 1);
        while lo < hi {
            let mid = lo + (hi - lo + 1) / 2;
            if separable(&dist, n, candidates[mid]) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        candidates[lo]
    }
}

// Every pair closer than limit must be split across the two groups --
// exactly "the conflict graph is bipartite".
fn separable(dist: &Vec<Vec<i32>>, n: usize, limit: i32) -> bool {
    let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
    for u in 0..n {
        for v in 0..n {
            if v != u && dist[u][v] < limit {
                adj[u].push(v);
            }
        }
    }
    let mut color = vec![-1i32; n];
    let mut stack: Vec<usize> = Vec::new();
    for start in 0..n {
        if color[start] != -1 {
            continue;
        }
        color[start] = 0;
        stack.push(start);
        while let Some(u) = stack.pop() {
            let cu = color[u];
            for &v in &adj[u] {
                if color[v] == -1 {
                    color[v] = cu ^ 1;
                    stack.push(v);
                } else if color[v] == cu {
                    return false;
                }
            }
        }
    }
    true
}
