use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_cost_to_supply_water(n: i32, wells: Vec<i32>, pipes: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        // Prim over sites 1..n plus a virtual node 0 (source edges): grow the
        // tree outward from node 0, always settling the cheapest frontier
        // edge; an edge must beat the site's recorded best to be pushed.
        let mut adj: Vec<Vec<(i32, usize)>> = vec![Vec::new(); n + 1];
        for i in 0..n {
            adj[0].push((wells[i], i + 1));
            adj[i + 1].push((wells[i], 0));
        }
        for pipe in &pipes {
            let (a, b) = (pipe[0] as usize, pipe[1] as usize);
            adj[a].push((pipe[2], b));
            adj[b].push((pipe[2], a));
        }

        let mut best = vec![i32::MAX; n + 1];
        best[0] = 0;
        let mut visited = vec![false; n + 1];
        let mut heap: BinaryHeap<Reverse<(i32, usize)>> = BinaryHeap::new();
        heap.push(Reverse((0, 0)));
        let mut total = 0i32;
        let mut taken = 0usize;
        while let Some(Reverse((cost, site))) = heap.pop() {
            // Stale-entry guard: the site already joined the tree earlier.
            if visited[site] {
                continue;
            }
            visited[site] = true;
            total += cost;
            taken += 1;
            if taken == n + 1 {
                break;
            }
            for &(w, v) in &adj[site] {
                // Relax only when the link strictly improves the site's best.
                if !visited[v] && w < best[v] {
                    best[v] = w;
                    heap.push(Reverse((w, v)));
                }
            }
        }
        total
    }
}
