impl Solution {
    pub fn min_increase(n: i32, edges: Vec<Vec<i32>>, cost: Vec<i32>) -> i32 {
        let n = n as usize;
        // Scores can only be raised, so every root-to-leaf path must reach
        // M = largest raw path sum. Let f[v] be the largest raw path sum
        // through v; the total raise owed inside v's subtree is g[v] = M -
        // f[v]. g never decreases downward, so an increase is unavoidable
        // exactly when g[v] > g[parent]: that jump cannot be charged any
        // higher. Sums reach 1e5 * 1e9 = 1e14, so the walk is i64.
        let mut adj = vec![Vec::new(); n];
        for e in &edges {
            adj[e[0] as usize].push(e[1] as usize);
            adj[e[1] as usize].push(e[0] as usize);
        }
        // Iterative rooted ordering (trees here can be a single long path).
        let mut parent = vec![0usize; n];
        let mut order = Vec::with_capacity(n);
        let mut seen = vec![false; n];
        seen[0] = true;
        order.push(0);
        let mut i = 0;
        while i < order.len() {
            let v = order[i];
            i += 1;
            for &w in &adj[v] {
                if !seen[w] {
                    seen[w] = true;
                    parent[w] = v;
                    order.push(w);
                }
            }
        }
        // Pass 1 (bottom-up): down[v] = largest raw suffix sum v..leaf.
        let mut down = vec![0i64; n];
        for i in (0..n).rev() {
            let v = order[i];
            let mut best = 0i64;
            for &w in &adj[v] {
                if parent[w] == v && down[w] > best {
                    best = down[w];
                }
            }
            down[v] = cost[v] as i64 + best;
        }
        // Pass 2 (top-down): f[v] = raw prefix above v + down[v]; propagate
        // the running minimum of f, and count the strict drops of f, which
        // are exactly the jumps of g.
        let mut prefix = vec![0i64; n];
        let mut f = vec![0i64; n];
        prefix[0] = cost[0] as i64;
        f[0] = down[0];
        let mut ans = 0i64;
        for i in 1..n {
            let v = order[i];
            let p = parent[v];
            prefix[v] = prefix[p] + cost[v] as i64;
            let fv = prefix[p] + down[v];
            if fv < f[p] {
                ans += 1;
                f[v] = fv;
            } else {
                f[v] = f[p];
            }
        }
        ans as i32
    }
}
