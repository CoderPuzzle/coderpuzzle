impl Solution {
    pub fn last_marked_nodes(edges: Vec<Vec<i32>>) -> Vec<i32> {
        // Marking spreads one BFS layer per second, so the last marked node
        // for a start i is a farthest node from i, and a farthest node from
        // any node is always an endpoint of a diameter. Two sweeps find the
        // diameter endpoints u and v; the distance arrays from both then
        // answer every i at once -- the farther endpoint is a last-marked
        // node, and on a tie either endpoint qualifies.
        let n = edges.len() + 1;
        let mut adj = vec![Vec::new(); n];
        for e in &edges {
            adj[e[0] as usize].push(e[1] as usize);
            adj[e[1] as usize].push(e[0] as usize);
        }

        let bfs = |src: usize| -> (Vec<i32>, usize) {
            let mut dist = vec![-1i32; n];
            dist[src] = 0;
            let mut queue = Vec::with_capacity(n);
            queue.push(src);
            let mut far = src;
            let mut head = 0;
            while head < queue.len() {
                let node = queue[head];
                head += 1;
                for &nxt in &adj[node] {
                    if dist[nxt] == -1 {
                        dist[nxt] = dist[node] + 1;
                        if dist[nxt] > dist[far] {
                            far = nxt;
                        }
                        queue.push(nxt);
                    }
                }
            }
            (dist, far)
        };

        let (_, u) = bfs(0);
        let (dist_u, v) = bfs(u);
        let (dist_v, _) = bfs(v);
        (0..n)
            .map(|i| if dist_u[i] > dist_v[i] { u as i32 } else { v as i32 })
            .collect()
    }
}
