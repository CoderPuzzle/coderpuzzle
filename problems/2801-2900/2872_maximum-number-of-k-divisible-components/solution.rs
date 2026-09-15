impl Solution {
    pub fn max_k_divisible_components(n: i32, edges: Vec<Vec<i32>>, values: Vec<i32>, k: i32) -> i32 {
        let n = n as usize;
        let k = k as i64;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for edge in &edges {
            let a = edge[0] as usize;
            let b = edge[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        // Iterative DFS from root 0 to get a processing order (parents first).
        let mut parent = vec![-1i64; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut stack: Vec<usize> = vec![0];
        let mut visited = vec![false; n];
        visited[0] = true;
        while let Some(u) = stack.pop() {
            order.push(u);
            for &v in &adj[u] {
                if !visited[v] {
                    visited[v] = true;
                    parent[v] = u as i64;
                    stack.push(v);
                }
            }
        }

        // Process children before parents; cut an edge whenever the finished
        // subtree sum is divisible by k.
        let mut subtree: Vec<i64> = values.iter().map(|&v| v as i64).collect();
        let mut components = 0i32;
        for &u in order.iter().rev() {
            if u != 0 {
                if subtree[u] % k == 0 {
                    components += 1;
                } else {
                    let p = parent[u] as usize;
                    subtree[p] += subtree[u];
                }
            }
        }
        components + 1
    }
}
