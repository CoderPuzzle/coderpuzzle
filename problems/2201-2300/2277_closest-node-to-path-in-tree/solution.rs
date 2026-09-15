impl Solution {
    pub fn closest_node(n: i32, edges: Vec<Vec<i32>>, query: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        // Breadth-first walk from the root records parents and depths
        // without recursion, so chain-shaped trees cannot overflow the
        // call stack.
        let mut parent = vec![-1i32; n];
        let mut depth = vec![0usize; n];
        let mut visited = vec![false; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        visited[0] = true;
        order.push(0);
        let mut head = 0usize;
        while head < order.len() {
            let u = order[head];
            head += 1;
            for &v in &adj[u] {
                if !visited[v] {
                    visited[v] = true;
                    parent[v] = u as i32;
                    depth[v] = depth[u] + 1;
                    order.push(v);
                }
            }
        }

        // up[k][v] is the 2^k-th ancestor of v, or -1 once past the root.
        let mut log = 1usize;
        while (1usize << log) < n {
            log += 1;
        }
        let mut up: Vec<Vec<i32>> = Vec::with_capacity(log);
        up.push(parent.clone());
        for k in 1..log {
            let prev = &up[k - 1];
            let mut cur = vec![-1i32; n];
            for v in 0..n {
                let mid = prev[v];
                if mid != -1 {
                    cur[v] = prev[mid as usize];
                }
            }
            up.push(cur);
        }

        // The deepest of the three pairwise LCAs is where node's route
        // merges onto the start-end path -- always on the path, and the
        // unique minimizer of the distance to it.
        let lca = |u0: usize, v0: usize| -> usize {
            let (mut u, mut v) = (u0, v0);
            if depth[u] < depth[v] {
                std::mem::swap(&mut u, &mut v);
            }
            let mut diff = depth[u] - depth[v];
            let mut k = 0usize;
            while diff > 0 {
                if diff & 1 == 1 {
                    u = up[k][u] as usize;
                }
                diff >>= 1;
                k += 1;
            }
            if u == v {
                return u;
            }
            for k in (0..log).rev() {
                if up[k][u] != up[k][v] {
                    u = up[k][u] as usize;
                    v = up[k][v] as usize;
                }
            }
            parent[u] as usize
        };

        let mut answer = Vec::with_capacity(query.len());
        for q in &query {
            let (s, e, x) = (q[0] as usize, q[1] as usize, q[2] as usize);
            let mut best = lca(s, e);
            for cand in [lca(s, x), lca(e, x)] {
                if depth[cand] > depth[best] {
                    best = cand;
                }
            }
            answer.push(best as i32);
        }
        answer
    }
}
