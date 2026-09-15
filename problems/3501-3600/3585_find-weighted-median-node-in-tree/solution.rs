impl Solution {
    pub fn find_median(n: i32, edges: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        // Root the tree at 0 with an explicit stack (a 10^5-node chain
        // would blow the thread stack), recording parent, depth and
        // weighted root distance. Binary lifting then answers each
        // query in O(log n): lift to the LCA l, take the total path
        // weight tot and the cumulative sum acc from u to l. "Sum >=
        // tot/2" is tested as 2 * sum >= tot so no halves appear; all
        // distances fit in i64 (n * max_w <= 10^14).
        let n = n as usize;
        let mut adj = vec![Vec::new(); n];
        for e in &edges {
            adj[e[0] as usize].push((e[1] as usize, e[2] as i64));
            adj[e[1] as usize].push((e[0] as usize, e[2] as i64));
        }
        let mut parent = vec![0usize; n];
        let mut depth = vec![0i32; n];
        let mut dist = vec![0i64; n];
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
        let mut log = 1usize;
        while (1usize << log) < n {
            log += 1;
        }
        let mut up: Vec<Vec<usize>> = Vec::with_capacity(log);
        up.push(parent.clone());
        for k in 1..log {
            let prev = &up[k - 1];
            let mut cur = vec![0usize; n];
            for (v, val) in cur.iter_mut().enumerate() {
                *val = prev[prev[v]];
            }
            up.push(cur);
        }
        let mut answer = Vec::with_capacity(queries.len());
        for q in &queries {
            let (a, b) = (q[0] as usize, q[1] as usize);
            if a == b {
                // Single-node path: the sum from a to itself (0)
                // already meets half of the zero total, so a is the
                // median.
                answer.push(a as i32);
                continue;
            }
            let (mut u, mut v) = if depth[a] >= depth[b] { (a, b) } else { (b, a) };
            let mut diff = (depth[u] - depth[v]) as usize;
            let mut k = 0usize;
            while diff > 0 {
                if diff & 1 == 1 {
                    u = up[k][u];
                }
                diff >>= 1;
                k += 1;
            }
            let mut l = v;
            if u != v {
                for kk in (0..log).rev() {
                    if up[kk][u] != up[kk][v] {
                        u = up[kk][u];
                        v = up[kk][v];
                    }
                }
                l = parent[u];
            }
            let tot = dist[a] + dist[b] - 2 * dist[l];
            let acc = dist[a] - dist[l];
            if 2 * acc >= tot {
                // Median on the a -> l stretch. Climb from a while the
                // criterion still fails; the parent of the deepest
                // failing node is the first one that satisfies it.
                let mut x = a;
                for kk in (0..log).rev() {
                    let t = up[kk][x];
                    if depth[t] >= depth[l] && 2 * (dist[a] - dist[t]) < tot {
                        x = t;
                    }
                }
                answer.push(parent[x] as i32);
            } else {
                // Median on the l -> b stretch. Climb from b while the
                // criterion still holds; the highest such node (never
                // l itself, which failed) is the median.
                let mut x = b;
                for kk in (0..log).rev() {
                    let t = up[kk][x];
                    if depth[t] > depth[l] && 2 * (acc + dist[t] - dist[l]) >= tot {
                        x = t;
                    }
                }
                answer.push(x as i32);
            }
        }
        answer
    }
}
