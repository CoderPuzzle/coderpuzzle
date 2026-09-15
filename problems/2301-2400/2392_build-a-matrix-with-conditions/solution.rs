use std::collections::VecDeque;

impl Solution {
    pub fn build_matrix(k: i32, rowConditions: Vec<Vec<i32>>, colConditions: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let kk = k as usize;
        let row_order = match Self::topo(kk, &rowConditions) {
            Some(o) => o,
            None => return vec![],
        };
        let col_order = match Self::topo(kk, &colConditions) {
            Some(o) => o,
            None => return vec![],
        };
        // The two orders are independent; distinct vertices of a topo order
        // get distinct positions, so every required pair stays strictly
        // ordered when v is placed at (row_pos[v], col_pos[v]).
        let mut row_pos = vec![0usize; kk + 1];
        let mut col_pos = vec![0usize; kk + 1];
        for (i, &v) in row_order.iter().enumerate() {
            row_pos[v as usize] = i;
        }
        for (i, &v) in col_order.iter().enumerate() {
            col_pos[v as usize] = i;
        }
        let mut matrix = vec![vec![0i32; kk]; kk];
        for v in 1..=kk {
            matrix[row_pos[v]][col_pos[v]] = v as i32;
        }
        matrix
    }

    // Kahn's algorithm over the condition graph. Duplicate conditions only
    // add parallel edges and matching indegrees — harmless.
    fn topo(k: usize, conditions: &[Vec<i32>]) -> Option<Vec<i32>> {
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); k + 1];
        let mut indeg = vec![0i32; k + 1];
        for c in conditions {
            let a = c[0] as usize;
            let b = c[1] as usize;
            adj[a].push(b);
            indeg[b] += 1;
        }
        let mut queue: VecDeque<usize> = VecDeque::new();
        for v in 1..=k {
            if indeg[v] == 0 {
                queue.push_back(v);
            }
        }
        let mut order: Vec<i32> = Vec::with_capacity(k);
        while let Some(u) = queue.pop_front() {
            order.push(u as i32);
            for &w in &adj[u] {
                indeg[w] -= 1;
                if indeg[w] == 0 {
                    queue.push_back(w);
                }
            }
        }
        // Fewer than k vertices peeled means a cycle: no valid order.
        if order.len() != k {
            None
        } else {
            Some(order)
        }
    }
}
