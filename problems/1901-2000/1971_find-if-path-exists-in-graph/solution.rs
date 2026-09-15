use std::collections::VecDeque;

impl Solution {
    pub fn valid_path(n: i32, edges: Vec<Vec<i32>>, source: i32, destination: i32) -> bool {
        // Build the adjacency list, then run a breadth-first search from
        // source. The graph is undirected, so every edge is added in both
        // directions. A visited vec keeps the search from re-processing
        // nodes; if destination is reached the path exists, and when the
        // queue empties without reaching it, no path can exist either.
        let n = n as usize;
        let (source, destination) = (source as usize, destination as usize);
        let mut graph = vec![Vec::<usize>::new(); n];
        for edge in edges {
            graph[edge[0] as usize].push(edge[1] as usize);
            graph[edge[1] as usize].push(edge[0] as usize);
        }
        if source == destination {
            return true;
        }
        let mut visited = vec![false; n];
        visited[source] = true;
        let mut pending = VecDeque::new();
        pending.push_back(source);
        while let Some(node) = pending.pop_front() {
            for &neighbor in &graph[node] {
                if neighbor == destination {
                    return true;
                }
                if !visited[neighbor] {
                    visited[neighbor] = true;
                    pending.push_back(neighbor);
                }
            }
        }
        false
    }
}
