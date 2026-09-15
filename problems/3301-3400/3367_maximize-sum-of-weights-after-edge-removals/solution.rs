impl Solution {
    pub fn maximize_sum_of_weights(edges: Vec<Vec<i32>>, k: i32) -> i64 {
        let mut n = 0usize;
        for e in &edges {
            n = n.max(e[0] as usize).max(e[1] as usize);
        }
        n += 1;
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            let w = e[2] as i64;
            adj[u].push((v, w));
            adj[v].push((u, w));
        }

        let mut parent = vec![usize::MAX; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        parent[0] = 0;
        let mut stack: Vec<usize> = vec![0];
        while let Some(u) = stack.pop() {
            order.push(u);
            for &(v, _w) in &adj[u] {
                if v == parent[u] {
                    continue;
                }
                parent[v] = u;
                stack.push(v);
            }
        }

        // g[u]: best subtree sum when the edge to u's parent is NOT kept.
        // f[u]: best subtree sum when the edge to u's parent IS kept.
        let mut g = vec![0i64; n];
        let mut f = vec![0i64; n];
        let mut gains: Vec<i64> = Vec::new();
        for &u in order.iter().rev() {
            let mut total = 0i64;
            gains.clear();
            for &(v, w) in &adj[u] {
                if parent[v] == u {
                    total += g[v];
                    gains.push(w + f[v] - g[v]);
                }
            }
            gains.sort_unstable_by(|a, b| b.cmp(a));
            let take = (k as usize).min(gains.len());
            let take1 = (k as usize).saturating_sub(1).min(gains.len());
            let mut s0 = total;
            let mut s1 = total;
            for i in 0..take {
                if gains[i] > 0 {
                    s0 += gains[i];
                }
            }
            for i in 0..take1 {
                if gains[i] > 0 {
                    s1 += gains[i];
                }
            }
            g[u] = s0;
            f[u] = s1;
        }
        g[0]
    }
}
