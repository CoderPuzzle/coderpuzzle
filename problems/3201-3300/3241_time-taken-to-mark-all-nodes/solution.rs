impl Solution {
    pub fn time_taken(edges: Vec<Vec<i32>>) -> Vec<i32> {
        // Reroot DP. Moving into node v costs 1 if v is odd, 2 if v is even.
        let n = edges.len() + 1;
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            adj[u].push(v);
            adj[v].push(u);
        }

        // Iterative DFS ordering rooted at 0 (parent of root = -2 sentinel).
        let mut parent: Vec<i64> = vec![-1; n];
        parent[0] = -2;
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut stack: Vec<usize> = vec![0];
        while let Some(u) = stack.pop() {
            order.push(u);
            for &v in &adj[u] {
                if v as i64 == parent[u] {
                    continue;
                }
                parent[v] = u as i64;
                stack.push(v);
            }
        }

        let mut last: Vec<i32> = vec![0; n]; // max marking time within u's subtree
        let mut last_no: Vec<i64> = vec![-1; n]; // child attaining last[u]
        let mut second: Vec<i32> = vec![0; n]; // second-best child contribution
        for &u in order.iter().rev() {
            for &v in &adj[u] {
                if v as i64 == parent[u] {
                    continue;
                }
                let t = last[v] + if v % 2 == 0 { 2 } else { 1 };
                if last[u] < t {
                    second[u] = last[u];
                    last[u] = t;
                    last_no[u] = v as i64;
                } else if second[u] < t {
                    second[u] = t;
                }
            }
        }

        let mut answer = last.clone();
        let mut up: Vec<i32> = vec![0; n]; // best time outside u's subtree
        for &u in order.iter() {
            let cost = if u % 2 == 0 { 2 } else { 1 };
            for &v in &adj[u] {
                if v as i64 == parent[u] {
                    continue;
                }
                let base = if v as i64 == last_no[u] { second[u] } else { last[u] };
                let pl = up[u].max(base) + cost;
                up[v] = pl;
                if pl > answer[v] {
                    answer[v] = pl;
                }
            }
        }
        answer
    }
}
