impl Solution {
    pub fn minimum_weight(edges: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i64> {
        let n = edges.len() + 1;
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        for e in &edges {
            let (u, v, w) = (e[0] as usize, e[1] as usize, e[2] as i64);
            adj[u].push((v, w));
            adj[v].push((u, w));
        }

        // Root at 0; iterative traversal so deep chains cannot overflow the stack.
        let mut depth = vec![0usize; n];
        let mut dist = vec![0i64; n];
        let mut parent = vec![0usize; n];
        let mut seen = vec![false; n];
        seen[0] = true;
        let mut stack = vec![0usize];
        while let Some(u) = stack.pop() {
            for &(v, w) in &adj[u] {
                if !seen[v] {
                    seen[v] = true;
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    dist[v] = dist[u] + w;
                    stack.push(v);
                }
            }
        }

        // Binary lifting: up[k][v] is the 2^k-th ancestor of v (root's is root).
        let mut log = 1usize;
        while (1usize << log) <= n - 1 {
            log += 1;
        }
        let mut up = vec![parent.clone()];
        for k in 1..log {
            let prev = &up[k - 1];
            let cur: Vec<usize> = (0..n).map(|v| prev[prev[v]]).collect();
            up.push(cur);
        }

        let lca = |x: usize, y: usize| -> usize {
            let (mut x, mut y) = (x, y);
            if depth[x] < depth[y] {
                std::mem::swap(&mut x, &mut y);
            }
            let mut diff = depth[x] - depth[y];
            let mut k = 0;
            while diff > 0 {
                if diff & 1 == 1 {
                    x = up[k][x];
                }
                diff >>= 1;
                k += 1;
            }
            if x == y {
                return x;
            }
            for k in (0..log).rev() {
                if up[k][x] != up[k][y] {
                    x = up[k][x];
                    y = up[k][y];
                }
            }
            up[0][x]
        };
        let distance = |x: usize, y: usize| -> i64 { dist[x] + dist[y] - 2 * dist[lca(x, y)] };

        // The minimal subtree joining a, b, c is the union of the three paths,
        // each edge lying on exactly two of them.
        queries
            .iter()
            .map(|q| {
                let (a, b, c) = (q[0] as usize, q[1] as usize, q[2] as usize);
                (distance(a, b) + distance(b, c) + distance(c, a)) / 2
            })
            .collect()
    }
}
