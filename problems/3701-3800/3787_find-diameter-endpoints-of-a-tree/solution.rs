use std::collections::VecDeque;

impl Solution {
    pub fn find_special_nodes(n: i32, edges: Vec<Vec<i32>>) -> String {
        let n = n as usize;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        // First sweep from node 0: one side's diameter endpoints. Any member
        // of that set is itself an endpoint, so the second sweep's farthest
        // nodes are the opposite endpoints.
        let one_end = Self::bfs(n, &adj, 0);
        let first = one_end.iter().position(|&x| x).unwrap();
        let other_end = Self::bfs(n, &adj, first);

        // The union of the two endpoint sets is exactly the special nodes.
        let mut out = String::with_capacity(n);
        for i in 0..n {
            out.push(if one_end[i] || other_end[i] { '1' } else { '0' });
        }
        out
    }

    // Classic property: every node tying as farthest from src is the endpoint
    // of some diameter path, so the sweep marks the whole farthest set.
    fn bfs(n: usize, adj: &Vec<Vec<usize>>, src: usize) -> Vec<bool> {
        let mut dist = vec![-1i32; n];
        dist[src] = 0;
        let mut queue = VecDeque::with_capacity(n);
        queue.push_back(src);
        let mut far = 0;
        while let Some(u) = queue.pop_front() {
            for &v in &adj[u] {
                if dist[v] == -1 {
                    dist[v] = dist[u] + 1;
                    if dist[v] > far {
                        far = dist[v];
                    }
                    queue.push_back(v);
                }
            }
        }
        (0..n).map(|i| dist[i] == far).collect()
    }
}
