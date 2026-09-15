use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_cost(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        // Every edge (u, v, w) also contributes the single-move reversal
        // v -> u at 2 * w: standing at v, flip v's unused switch on the
        // incoming edge u -> v. Weights are positive, so an optimal trip is
        // a simple path and flips at most one switch per node anyway.
        let mut graph = vec![Vec::<(usize, i64)>::new(); n];
        for edge in edges {
            let (u, v, w) = (edge[0] as usize, edge[1] as usize, edge[2] as i64);
            graph[u].push((v, w));
            graph[v].push((u, 2 * w));
        }

        // Dijkstra from node 0; weights are positive, so each pop finalizes.
        let mut distances = vec![i64::MAX; n];
        distances[0] = 0;
        let mut heap = BinaryHeap::new();
        heap.push(Reverse((0_i64, 0_usize)));
        while let Some(Reverse((distance, node))) = heap.pop() {
            if distance != distances[node] {
                continue; // stale entry; the node was finalized earlier
            }
            for &(neighbor, weight) in &graph[node] {
                let candidate = distance + weight;
                if candidate < distances[neighbor] {
                    distances[neighbor] = candidate;
                    heap.push(Reverse((candidate, neighbor)));
                }
            }
        }

        // An unreached target keeps the MAX sentinel.
        let best = distances[n - 1];
        if best == i64::MAX {
            -1
        } else {
            best as i32
        }
    }
}
