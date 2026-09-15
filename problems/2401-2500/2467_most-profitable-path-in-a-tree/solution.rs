use std::collections::HashMap;

impl Solution {
    pub fn most_profitable_path(edges: Vec<Vec<i32>>, bob: i32, amount: Vec<i32>) -> i32 {
        let n = amount.len();
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        // One BFS from the root orients the tree: depth[u] is Alice's
        // arrival time, and order lists every node after its parent.
        let mut parent: Vec<i64> = vec![-1; n];
        let mut depth = vec![0usize; n];
        let mut seen = vec![false; n];
        seen[0] = true;
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut queue: std::collections::VecDeque<usize> = std::collections::VecDeque::new();
        queue.push_back(0);
        while let Some(u) = queue.pop_front() {
            order.push(u);
            for &v in &adj[u] {
                if !seen[v] {
                    seen[v] = true;
                    parent[v] = u as i64;
                    depth[v] = depth[u] + 1;
                    queue.push_back(v);
                }
            }
        }

        // Bob has no choices: walk his unique path to the root, recording
        // his arrival time at each node along it.
        let mut bob_time: HashMap<usize, usize> = HashMap::new();
        let mut t = 0usize;
        let mut node = bob as i64;
        while node != -1 {
            bob_time.insert(node as usize, t);
            t += 1;
            node = parent[node as usize];
        }

        // BFS order makes income[parent] final before u, so each root-to-node
        // path sum builds in one sweep. gain compares arrivals: Bob later or
        // absent -> full amount; simultaneous -> half (exact: amounts are
        // even); Bob earlier -> gate already open, 0.
        let mut income = vec![0i32; n];
        let mut best: Option<i32> = None;
        for &u in &order {
            let d = depth[u];
            let bt = bob_time.get(&u).copied();
            let gain = match bt {
                None => amount[u],
                Some(bt) if bt > d => amount[u],
                Some(bt) if bt == d => amount[u].div_euclid(2),
                Some(_) => 0,
            };
            income[u] = if u != 0 { income[parent[u] as usize] } else { 0 } + gain;
            // Alice must keep moving, so she stops at a leaf: a non-root
            // node with exactly one neighbor.
            if u != 0 && adj[u].len() == 1 {
                best = Some(match best {
                    None => income[u],
                    Some(b) => b.max(income[u]),
                });
            }
        }
        best.unwrap_or(0)
    }
}
