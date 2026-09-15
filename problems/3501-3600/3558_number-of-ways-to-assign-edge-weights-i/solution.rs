impl Solution {
    pub fn assign_edge_weights(edges: Vec<Vec<i32>>) -> i32 {
        // A weight of 2 never changes parity, so only the number of 1s on
        // the path to a deepest node matters: any odd-size subset of the
        // d = max depth edges gives an odd cost, and there are 2^(d-1) of
        // those. An iterative DFS finds d (the tree can be a long chain).
        const MOD: i64 = 1_000_000_007;
        let n = edges.len() + 1;
        let mut adj = vec![Vec::new(); n + 1];
        for e in &edges {
            adj[e[0] as usize].push(e[1] as usize);
            adj[e[1] as usize].push(e[0] as usize);
        }
        let mut depth = vec![-1i32; n + 1];
        depth[1] = 0;
        let mut stack = vec![1usize];
        let mut max_depth = 0i32;
        while let Some(u) = stack.pop() {
            for &v in &adj[u] {
                if depth[v] < 0 {
                    depth[v] = depth[u] + 1;
                    max_depth = max_depth.max(depth[v]);
                    stack.push(v);
                }
            }
        }
        let mut ways: i64 = 1;
        for _ in 0..max_depth - 1 {
            ways = ways * 2 % MOD;
        }
        ways as i32
    }
}
