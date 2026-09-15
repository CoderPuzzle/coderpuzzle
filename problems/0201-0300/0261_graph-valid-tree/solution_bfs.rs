use std::collections::VecDeque;

impl Solution {
    pub fn valid_tree(n: i32, edges: Vec<Vec<i32>>) -> bool {
        let n = n as usize;
        // A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
        // more cannot stay acyclic — any other count fails immediately.
        if edges.len() != n.wrapping_sub(1) {
            return false;
        }
        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            adjacency[e[0] as usize].push(e[1] as usize);
            adjacency[e[1] as usize].push(e[0] as usize);
        }
        // With n - 1 edges on the table, connectivity is the only open
        // question: connected + n - 1 edges forces the graph to be a tree.
        let mut seen = vec![false; n];
        let mut queue: VecDeque<usize> = VecDeque::new();
        queue.push_back(0);
        seen[0] = true;
        let mut visited = 1;
        while let Some(u) = queue.pop_front() {
            for &v in &adjacency[u] {
                if !seen[v] {
                    seen[v] = true;
                    visited += 1;
                    queue.push_back(v);
                }
            }
        }
        visited == n
    }
}
