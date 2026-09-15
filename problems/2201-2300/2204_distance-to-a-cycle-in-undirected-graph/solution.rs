use std::collections::VecDeque;

impl Solution {
    pub fn distance_to_cycle(n: i32, edges: Vec<Vec<i32>>) -> Vec<i32> {
        let n = n as usize;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut degree = vec![0i32; n];
        for e in &edges {
            let (a, b) = (e[0] as usize, e[1] as usize);
            adj[a].push(b);
            adj[b].push(a);
            degree[a] += 1;
            degree[b] += 1;
        }

        // peel off degree-1 leaves; whatever remains is the unique cycle
        let mut removed = vec![false; n];
        let mut queue: VecDeque<usize> = VecDeque::new();
        for i in 0..n {
            if degree[i] == 1 {
                queue.push_back(i);
            }
        }
        while let Some(u) = queue.pop_front() {
            removed[u] = true;
            for &v in &adj[u] {
                if !removed[v] {
                    degree[v] -= 1;
                    if degree[v] == 1 {
                        queue.push_back(v);
                    }
                }
            }
        }

        // multi-source BFS from all cycle nodes
        let mut dist = vec![0i32; n];
        let mut visited = vec![false; n];
        let mut bfs: VecDeque<usize> = VecDeque::new();
        for u in 0..n {
            if !removed[u] {
                visited[u] = true;
                bfs.push_back(u);
            }
        }
        while let Some(u) = bfs.pop_front() {
            for &v in &adj[u] {
                if !visited[v] {
                    visited[v] = true;
                    dist[v] = dist[u] + 1;
                    bfs.push_back(v);
                }
            }
        }
        dist
    }
}
