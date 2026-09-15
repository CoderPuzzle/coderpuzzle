impl Solution {
    pub fn find_shortest_cycle(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        // BFS from every vertex: non-tree edges (u, v) close cycles of length
        // dist[u] + dist[v] + 1 through the root's levels, and scanning all
        // roots measures every cycle at one of its own vertices.
        let n = n as usize;
        let mut adj = vec![Vec::new(); n];
        for edge in &edges {
            adj[edge[0] as usize].push(edge[1] as usize);
            adj[edge[1] as usize].push(edge[0] as usize);
        }
        let mut best = -1i32;
        let mut dist = vec![-1i32; n];
        // Sentinel outside the valid id range plays "no parent" for roots.
        let mut parent = vec![usize::MAX; n];
        let mut queue = vec![0usize; n];
        for start in 0..n {
            for v in 0..n {
                dist[v] = -1;
                parent[v] = usize::MAX;
            }
            dist[start] = 0;
            queue[0] = start;
            let mut head = 0usize;
            let mut tail = 1usize;
            while head < tail {
                let u = queue[head];
                head += 1;
                for &v in &adj[u] {
                    if dist[v] == -1 {
                        dist[v] = dist[u] + 1;
                        parent[v] = u;
                        queue[tail] = v;
                        tail += 1;
                    } else if parent[u] != v && parent[v] != u {
                        // Tree edges would double-count one path instead of
                        // closing a ring, so only genuine cross links count.
                        let length = dist[u] + dist[v] + 1;
                        if best == -1 || length < best {
                            best = length;
                        }
                    }
                }
            }
        }
        best
    }
}
