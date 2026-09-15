use std::collections::VecDeque;

impl Solution {
    pub fn tree_diameter(edges: Vec<Vec<i32>>) -> i32 {
        // No edges: a single-node tree, diameter 0.
        if edges.is_empty() {
            return 0;
        }
        let n = edges.len() + 1;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        let bfs = |src: usize| -> (usize, i32) {
            // -1 doubles as the visited marker; a tree has one path between
            // any two nodes, so BFS distances are true path lengths.
            let mut dist = vec![-1i32; n];
            dist[src] = 0;
            let mut queue: VecDeque<usize> = VecDeque::new();
            queue.push_back(src);
            let mut far = src;
            while let Some(u) = queue.pop_front() {
                for &v in &adj[u] {
                    if dist[v] < 0 {
                        dist[v] = dist[u] + 1;
                        queue.push_back(v);
                        // Track the farthest node on the fly.
                        if dist[v] > dist[far] {
                            far = v;
                        }
                    }
                }
            }
            (far, dist[far])
        };

        // Double BFS: the farthest node B from any start is an endpoint of a
        // longest path, so B's eccentricity (second pass) is the diameter.
        let (far, _) = bfs(0);
        let (_, diameter) = bfs(far);
        diameter
    }
}
