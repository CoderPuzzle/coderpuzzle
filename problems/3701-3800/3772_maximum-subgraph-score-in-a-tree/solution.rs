impl Solution {
    pub fn max_subgraph_score(n: i32, edges: Vec<Vec<i32>>, good: Vec<i32>) -> Vec<i32> {
        let n = n as usize;
        let neg: i64 = -1i64 << 60;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            adj[e[0] as usize].push(e[1] as usize);
            adj[e[1] as usize].push(e[0] as usize);
        }

        // Iterative DFS (explicit stack): safe on deep trees; records parent,
        // children, and an order where every parent precedes its children.
        let mut parent: Vec<i64> = vec![-1; n];
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut order: Vec<usize> = Vec::new();
        let mut stack: Vec<usize> = vec![0];
        parent[0] = -2;
        while let Some(u) = stack.pop() {
            order.push(u);
            for &v in &adj[u] {
                if v as i64 == parent[u] {
                    continue;
                }
                parent[v] = u as i64;
                children[u].push(v);
                stack.push(v);
            }
        }

        // +1 for good, -1 for bad: a connected subgraph's score is its weight sum,
        // so the task is the max-weight connected subgraph through each node.
        let weight: Vec<i64> = good.iter().map(|&g| if g != 0 { 1 } else { -1 }).collect();

        // down[u]: best score of a connected subgraph confined to u's subtree:
        // weight[u] plus each child's down only when positive, pruning harmful
        // branches. Reverse order computes children before parents.
        let mut down = vec![0i64; n];
        for &u in order.iter().rev() {
            let mut s = weight[u];
            for &c in &children[u] {
                if down[c] > 0 {
                    s += down[c];
                }
            }
            down[u] = s;
        }

        // up[u]: best connected piece reaching u only through its parent side
        // (u's own subtree excluded); the sentinel gives the root none.
        let mut up = vec![0i64; n];
        up[0] = neg;
        let mut result = vec![0i32; n];
        // Reroot in one preorder pass: each child inherits the parent plus u's
        // other worthwhile branches plus what the rest of the tree gave u;
        // dropping the child's own positive part keeps the two sides disjoint.
        for &u in &order {
            let mut total_pos: i64 = 0;
            for &c in &children[u] {
                total_pos += down[c].max(0);
            }
            for &c in &children[u] {
                up[c] = weight[u] + (total_pos - down[c].max(0)) + up[u].max(0);
            }
            // Answer for u: its weight, its positive child branches, and the
            // optional parent-side piece.
            result[u] = (weight[u] + total_pos + up[u].max(0)) as i32;
        }
        result
    }
}
