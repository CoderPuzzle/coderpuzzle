impl Solution {
    pub fn find_max_path_score(edges: Vec<Vec<i32>>, online: Vec<bool>, k: i64) -> i32 {
        let n = online.len();
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        let mut indeg = vec![0i64; n];
        for e in &edges {
            adj[e[0] as usize].push((e[1] as usize, e[2] as i64));
            indeg[e[1] as usize] += 1;
        }

        // Kahn's algorithm: the topological order is computed once and reused
        // by every feasibility check below (the graph is a DAG).
        let mut queue: std::collections::VecDeque<usize> = std::collections::VecDeque::new();
        for i in 0..n {
            if indeg[i] == 0 {
                queue.push_back(i);
            }
        }
        let mut topo: Vec<usize> = Vec::new();
        while let Some(u) = queue.pop_front() {
            topo.push(u);
            for &(v, _) in &adj[u] {
                indeg[v] -= 1;
                if indeg[v] == 0 {
                    queue.push_back(v);
                }
            }
        }

        // Feasibility is monotone in the threshold (lowering it only adds
        // edges), so binary-search the sorted distinct edge costs for the
        // largest feasible score.
        let mut costs: Vec<i64> = edges.iter().map(|e| e[2] as i64).collect();
        costs.sort();
        costs.dedup();

        // feasible(s): a path from 0 to n-1 within budget k exists using only
        // edges of cost >= s and only online nodes. The cheapest such path is
        // the right witness, so distances are minimized in topological order.
        let feasible = |s: i64| -> bool {
            let inf = i64::MAX / 4;
            let mut dist = vec![inf; n];
            dist[0] = 0;
            for &u in &topo {
                if dist[u] >= inf || !online[u] {
                    continue;
                }
                for &(v, c) in &adj[u] {
                    if c >= s && online[v] {
                        let nd = dist[u] + c;
                        if nd < dist[v] {
                            dist[v] = nd;
                        }
                    }
                }
            }
            dist[n - 1] <= k
        };

        // If even with every edge allowed no budget-feasible path exists, no
        // score is achievable.
        if !feasible(0) {
            return -1;
        }
        if costs.is_empty() {
            return 0;
        }
        let (mut lo, mut hi) = (0i64, costs.len() as i64 - 1);
        let mut ans = costs[0];
        while lo <= hi {
            let mid = lo + (hi - lo) / 2;
            if feasible(costs[mid as usize]) {
                ans = costs[mid as usize];
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        ans as i32
    }
}
