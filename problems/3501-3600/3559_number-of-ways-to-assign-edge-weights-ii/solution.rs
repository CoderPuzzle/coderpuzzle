impl Solution {
    pub fn assign_edge_weights(edges: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // As in part I, a path of d edges has odd cost for exactly 2^(d-1)
        // of its 2^d assignments (d = 0 answers 0), so each query only
        // needs the path length d = depth[u] + depth[v] - 2 * depth[lca].
        // Binary lifting answers every LCA in O(log n); the tree is rooted
        // with an explicit stack because it can be a 10^5-node chain.
        const MOD: i64 = 1_000_000_007;
        let n = edges.len() + 1;
        let mut adj = vec![Vec::new(); n + 1];
        for e in &edges {
            adj[e[0] as usize].push(e[1] as usize);
            adj[e[1] as usize].push(e[0] as usize);
        }
        let mut depth = vec![0i32; n + 1];
        let mut parent = vec![0usize; n + 1];
        let mut seen = vec![false; n + 1];
        seen[1] = true;
        let mut stack = vec![1usize];
        while let Some(u) = stack.pop() {
            for &v in &adj[u] {
                if !seen[v] {
                    seen[v] = true;
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    stack.push(v);
                }
            }
        }
        let mut log = 1usize;
        while (1usize << log) < n {
            log += 1;
        }
        let mut up: Vec<Vec<usize>> = Vec::with_capacity(log);
        up.push(parent.clone());
        for k in 1..log {
            let prev = &up[k - 1];
            let mut cur = vec![0usize; n + 1];
            for (v, val) in cur.iter_mut().enumerate() {
                *val = prev[prev[v]];
            }
            up.push(cur);
        }
        let mut p2 = vec![1i64; n];
        for i in 1..n {
            p2[i] = p2[i - 1] * 2 % MOD;
        }
        let mut answer = Vec::with_capacity(queries.len());
        for q in &queries {
            let (mut u, mut v) = if depth[q[0] as usize] >= depth[q[1] as usize] {
                (q[0] as usize, q[1] as usize)
            } else {
                (q[1] as usize, q[0] as usize)
            };
            let (du, dv) = (depth[u], depth[v]);
            let mut diff = (du - dv) as usize;
            let mut k = 0usize;
            while diff > 0 {
                if diff & 1 == 1 {
                    u = up[k][u];
                }
                diff >>= 1;
                k += 1;
            }
            if u != v {
                for kk in (0..log).rev() {
                    if up[kk][u] != up[kk][v] {
                        u = up[kk][u];
                        v = up[kk][v];
                    }
                }
                v = parent[u];
            }
            let d = (du + dv - 2 * depth[v]) as usize;
            answer.push(if d == 0 { 0 } else { p2[d - 1] as i32 });
        }
        answer
    }
}
