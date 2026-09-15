impl Solution {
    pub fn sum_of_distances_in_tree(n: i32, edges: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        // Iterative DFS from node 0: parents and a top-down visit order.
        let mut parent: Vec<i64> = vec![-1; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut seen: Vec<bool> = vec![false; n];
        seen[0] = true;
        order.push(0);
        let mut head = 0usize;
        while head < order.len() {
            let u = order[head];
            head += 1;
            for &v in &adj[u] {
                if !seen[v] {
                    seen[v] = true;
                    parent[v] = u as i64;
                    order.push(v);
                }
            }
        }

        let mut sub: Vec<i64> = vec![1; n];
        let mut dist: Vec<i64> = vec![0; n];
        // Bottom-up pass: dist[u] = sum over children of (dist[v] + sub[v]).
        for i in (0..order.len()).rev() {
            let u = order[i];
            for &v in &adj[u] {
                if v as i64 == parent[u] {
                    continue;
                }
                sub[u] += sub[v];
                dist[u] += dist[v] + sub[v];
            }
        }

        let mut ans: Vec<i32> = vec![0; n];
        ans[0] = dist[0] as i32;
        // Top-down re-rooting pass.
        for &u in &order {
            for &v in &adj[u] {
                if v as i64 == parent[u] {
                    continue;
                }
                ans[v] = (ans[u] as i64 - sub[v] + (n as i64 - sub[v])) as i32;
            }
        }
        ans
    }
}
