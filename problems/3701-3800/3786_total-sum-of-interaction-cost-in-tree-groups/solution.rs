impl Solution {
    pub fn interaction_costs(n: i32, edges: Vec<Vec<i32>>, group: Vec<i32>) -> i64 {
        let n = n as usize;
        // One slot per group label; labels are 1..20.
        const LABELS: usize = 21;

        let mut adjacency: Vec<Vec<usize>> = vec![Vec::new(); n];
        for edge in &edges {
            let (u, v) = (edge[0] as usize, edge[1] as usize);
            adjacency[u].push(v);
            adjacency[v].push(u);
        }

        let mut total = vec![0_i64; LABELS];
        for &label in &group {
            total[label as usize] += 1;
        }

        // Breadth-first discovery from node 0 records each node's parent;
        // an explicit queue keeps deep trees off the call stack.
        let mut parent = vec![usize::MAX; n];
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0);
        let mut index = 0;
        while index < order.len() {
            let node = order[index];
            index += 1;
            for &neighbor in &adjacency[node] {
                if neighbor != parent[node] {
                    parent[neighbor] = node;
                    order.push(neighbor);
                }
            }
        }

        // counts[node * LABELS + label] = same-label nodes inside node's
        // subtree. Reverse discovery order visits children before parents,
        // so each node's block is complete when its turn comes.
        let mut counts = vec![0_i64; n * LABELS];
        let mut answer = 0_i64;
        for &node in order[1..].iter().rev() {
            let base = node * LABELS;
            counts[base + group[node] as usize] += 1;
            let parent_base = parent[node] * LABELS;
            for label in 1..LABELS {
                let inside = counts[base + label];
                if inside > 0 {
                    // Every same-group pair split by the parent edge pays
                    // exactly one unit on this edge.
                    answer += inside * (total[label] - inside);
                    counts[parent_base + label] += inside;
                }
            }
        }
        answer
    }
}
