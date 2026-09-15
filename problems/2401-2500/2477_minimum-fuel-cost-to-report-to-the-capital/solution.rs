use std::collections::VecDeque;

impl Solution {
    pub fn minimum_fuel_cost(roads: Vec<Vec<i32>>, seats: i32) -> i32 {
        let n = roads.len() + 1;
        if n == 1 {
            return 0;
        }
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n];
        for r in &roads {
            let a = r[0] as usize;
            let b = r[1] as usize;
            adj[a].push(b);
            adj[b].push(a);
        }

        let mut parent: Vec<i64> = vec![-1; n];
        let mut seen = vec![false; n];
        seen[0] = true;
        let mut order: Vec<usize> = Vec::with_capacity(n);
        let mut queue: VecDeque<usize> = VecDeque::new();
        queue.push_back(0);
        while let Some(u) = queue.pop_front() {
            order.push(u);
            for &v in &adj[u] {
                if !seen[v] {
                    seen[v] = true;
                    parent[v] = u as i64;
                    queue.push_back(v);
                }
            }
        }

        let mut size = vec![1i64; n];
        let mut fuel: i64 = 0;
        for &u in order.iter().rev() {
            // children before parents
            if u == 0 {
                continue;
            }
            let p = parent[u] as usize;
            size[p] += size[u];
            fuel += (size[u] + seats as i64 - 1) / seats as i64;
        }
        fuel as i32
    }
}
