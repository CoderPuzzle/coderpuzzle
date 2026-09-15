impl Solution {
    pub fn min_cost(n: i32, edges: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = n as usize;
        let k = k as usize;
        let mut adj: Vec<Vec<(usize, i32)>> = vec![Vec::new(); n];
        let mut max_w = 0i32;
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            let w = e[2];
            adj[u].push((v, w));
            adj[v].push((u, w));
            if w > max_w {
                max_w = w;
            }
        }

        // Budget `money` repairs exactly the edges with w <= money, so
        // raising money only adds usable edges: feasibility is monotone and
        // the answer is binary-searchable.
        let can = |money: i32| -> bool {
            let mut dist = vec![-1i32; n];
            dist[0] = 0;
            let mut queue: std::collections::VecDeque<usize> = std::collections::VecDeque::new();
            queue.push_back(0);
            // BFS explores level by level, so dist[v] is the fewest edges
            // over available paths; nodes already at k are never expanded.
            while let Some(u) = queue.pop_front() {
                if dist[u] as usize >= k {
                    continue;
                }
                for &(v, w) in &adj[u] {
                    if w <= money && dist[v] == -1 {
                        dist[v] = dist[u] + 1;
                        queue.push_back(v);
                    }
                }
            }
            dist[n - 1] != -1 && (dist[n - 1] as usize) <= k
        };

        // If even repairing every edge fails (target unreachable, or every
        // path longer than k), there is no answer; otherwise can(hi) always
        // holds and the loop converges on the smallest feasible amount.
        if !can(max_w) {
            return -1;
        }
        let mut lo = 0i32;
        let mut hi = max_w;
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if can(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}
