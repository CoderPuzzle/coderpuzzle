impl Solution {
    // answer[i] = (nodes within k of i in tree 1) + max over v of (nodes
    // within k - 1 of v in tree 2): the connecting edge spends one of the
    // k steps, and queries are independent (hints 1-2). With k = 0 the
    // k - 1 limit floors to zero second-tree nodes. Layer BFS is iterative
    // — a 1000-node path would overflow the judged stack.
    fn build(edges: &Vec<Vec<i32>>) -> Vec<Vec<usize>> {
        let mut adj = vec![Vec::new(); edges.len() + 1];
        for e in edges {
            let (a, b) = (e[0] as usize, e[1] as usize);
            adj[a].push(b);
            adj[b].push(a);
        }
        adj
    }

    fn within(adj: &Vec<Vec<usize>>, start: usize, limit: i32) -> i32 {
        if limit < 0 {
            return 0;
        }
        let mut seen = vec![false; adj.len()];
        seen[start] = true;
        let mut count = 1;
        let mut frontier = vec![start];
        let mut depth = 0;
        while depth < limit && !frontier.is_empty() {
            let mut next = Vec::new();
            for &u in &frontier {
                for &w in &adj[u] {
                    if !seen[w] {
                        seen[w] = true;
                        count += 1;
                        next.push(w);
                    }
                }
            }
            frontier = next;
            depth += 1;
        }
        count
    }

    pub fn max_target_nodes(edges1: Vec<Vec<i32>>, edges2: Vec<Vec<i32>>, k: i32) -> Vec<i32> {
        let (adj1, adj2) = (Self::build(&edges1), Self::build(&edges2));
        let mut best2 = 0;
        for v in 0..adj2.len() {
            best2 = best2.max(Self::within(&adj2, v, k - 1));
        }
        (0..adj1.len()).map(|u| Self::within(&adj1, u, k) + best2).collect()
    }
}
