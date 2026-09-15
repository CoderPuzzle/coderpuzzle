use std::collections::VecDeque;

impl Solution {
    pub fn get_ancestors(n: i32, edges: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Kahn's order over the graph's natural direction: a node is dequeued
        // only once every incoming edge is consumed, so all of its direct
        // parents are final and its ancestor set is the union of each parent
        // plus that parent's already-computed set.
        let n = n as usize;
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut parents: Vec<Vec<usize>> = vec![Vec::new(); n];
        for edge in &edges {
            children[edge[0] as usize].push(edge[1] as usize);
            parents[edge[1] as usize].push(edge[0] as usize);
        }
        let words = (n + 63) / 64;
        // ancestors[v] is a bitset of the nodes that reach v
        let mut ancestors: Vec<Vec<u64>> = vec![vec![0u64; words]; n];
        let mut indegree: Vec<usize> = parents.iter().map(|ps| ps.len()).collect();
        let mut order: VecDeque<usize> = (0..n).filter(|&v| indegree[v] == 0).collect();
        while let Some(node) = order.pop_front() {
            for &parent in &parents[node] {
                ancestors[node][parent >> 6] |= 1u64 << (parent & 63);
                for w in 0..words {
                    ancestors[node][w] |= ancestors[parent][w];
                }
            }
            for &child in &children[node] {
                indegree[child] -= 1;
                if indegree[child] == 0 {
                    order.push_back(child);
                }
            }
        }
        let mut answer: Vec<Vec<i32>> = Vec::with_capacity(n);
        for set in &ancestors {
            let row: Vec<i32> = (0..n)
                .filter(|&u| set[u >> 6] & (1u64 << (u & 63)) != 0)
                .map(|u| u as i32)
                .collect();
            answer.push(row);
        }
        answer
    }
}
