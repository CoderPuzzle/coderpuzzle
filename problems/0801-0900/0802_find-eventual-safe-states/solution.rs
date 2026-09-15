use std::collections::VecDeque;

impl Solution {
    pub fn eventual_safe_nodes(graph: Vec<Vec<i32>>) -> Vec<i32> {
        let n = graph.len();
        // Kahn's peel on the reversed graph: a node is safe exactly
        // when every path from it terminates.
        let mut outdeg = vec![0usize; n];
        let mut radj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for u in 0..n {
            outdeg[u] = graph[u].len();
            for &v in &graph[u] {
                radj[v as usize].push(u);
            }
        }
        // Terminal nodes (out-degree 0) are trivially safe seeds.
        let mut queue: VecDeque<usize> = VecDeque::new();
        for i in 0..n {
            if outdeg[i] == 0 {
                queue.push_back(i);
            }
        }
        let mut safe = vec![false; n];
        while let Some(u) = queue.pop_front() {
            safe[u] = true;
            // A predecessor queues only once every outgoing neighbor
            // is proven safe — the definition of a safe node.
            for &v in &radj[u] {
                outdeg[v] -= 1;
                if outdeg[v] == 0 {
                    queue.push_back(v);
                }
            }
        }
        // Unpeeled nodes are exactly those on, or reaching, a cycle;
        // the ascending scan yields the required sorted order.
        (0..n).filter(|&i| safe[i]).map(|i| i as i32).collect()
    }
}
