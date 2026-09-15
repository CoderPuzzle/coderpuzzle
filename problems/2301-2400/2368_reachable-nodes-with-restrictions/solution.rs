use std::collections::{HashSet, VecDeque};

impl Solution {
    // One breadth-first sweep from node 0 over the tree, never entering a
    // restricted node; every dequeued node is counted exactly once.
    pub fn reachable_nodes(n: i32, edges: Vec<Vec<i32>>, restricted: Vec<i32>) -> i32 {
        let n = n as usize;
        let blocked: HashSet<i32> = restricted.into_iter().collect();
        let mut adjacent: Vec<Vec<i32>> = vec![Vec::new(); n];
        for edge in &edges {
            adjacent[edge[0] as usize].push(edge[1]);
            adjacent[edge[1] as usize].push(edge[0]);
        }
        let mut visited = vec![false; n];
        visited[0] = true;
        let mut queue = VecDeque::new();
        queue.push_back(0i32);
        let mut reached = 0;
        while let Some(node) = queue.pop_front() {
            reached += 1;
            for &neighbor in &adjacent[node as usize] {
                if !visited[neighbor as usize] && !blocked.contains(&neighbor) {
                    visited[neighbor as usize] = true;
                    queue.push_back(neighbor);
                }
            }
        }
        reached
    }
}
