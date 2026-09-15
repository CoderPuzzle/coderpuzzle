impl Solution {
    // dp[v][t] = best points from v's subtree when t ancestral halvings
    // already apply to coins[v]. Halving composes with the shift and
    // coins <= 10^4 < 2^14 die after 14 halvings, so the table is 15
    // wide. The total reaches n * max(coins) = 10^9, kept in i64 for
    // headroom. Traversal is iterative: a path tree is 10^5 deep.
    pub fn maximum_points(edges: Vec<Vec<i32>>, coins: Vec<i32>, k: i32) -> i64 {
        let n = coins.len();
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        // Root at 0 once: BFS fixes parents and a top-down visit order,
        // so every later pass walks flat arrays and nothing recurses.
        let mut parent = vec![-1i32; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0);
        let mut head = 0;
        while head < order.len() {
            let u = order[head];
            head += 1;
            for &v in &adj[u] {
                if parent[v] == -1 && v != 0 {
                    parent[v] = u as i32;
                    order.push(v);
                }
            }
        }

        // Bottom-up over reverse BFS order; s[v][t] accumulates the
        // children's dp column so each node finalizes in O(15). Column
        // 15 stays 0 forever (the absorbed state).
        let mut s = vec![[0_i64; 16]; n];
        let mut dp = vec![[0_i64; 16]; n];
        for i in (0..n).rev() {
            let v = order[i];
            let c = coins[v] as i64;
            for t in 0..15 {
                // First way: take the k hit (it may be negative). Second
                // way: halve, and the children inherit t + 1.
                let way1 = (c >> t) - k as i64 + s[v][t];
                let way2 = (c >> (t + 1)) + s[v][t + 1];
                dp[v][t] = way1.max(way2);
            }
            let p = parent[v];
            if p >= 0 {
                let p = p as usize;
                for t in 0..15 {
                    s[p][t] += dp[v][t];
                }
            }
        }
        dp[0][0]
    }
}
