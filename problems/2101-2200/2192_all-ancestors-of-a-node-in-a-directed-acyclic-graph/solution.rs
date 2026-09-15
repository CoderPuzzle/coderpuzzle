use std::collections::VecDeque;

impl Solution {
    pub fn get_ancestors(n: i32, edges: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Reverse every edge; ancestors of v are exactly the nodes
        // reachable from v in the reversed graph.
        let n = n as usize;
        let mut reverse_adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for edge in &edges {
            let from = edge[0] as usize;
            let to = edge[1] as usize;
            reverse_adj[to].push(from);
        }
        let mut answer: Vec<Vec<i32>> = Vec::with_capacity(n);
        for start in 0..n {
            let mut seen = vec![false; n];
            seen[start] = true;
            let mut frontier = VecDeque::new();
            frontier.push_back(start);
            while let Some(node) = frontier.pop_front() {
                for &prev in &reverse_adj[node] {
                    if !seen[prev] {
                        seen[prev] = true;
                        frontier.push_back(prev);
                    }
                }
            }
            let row: Vec<i32> = (0..n).filter(|&u| seen[u] && u != start).map(|u| u as i32).collect();
            answer.push(row);
        }
        answer
    }
}
