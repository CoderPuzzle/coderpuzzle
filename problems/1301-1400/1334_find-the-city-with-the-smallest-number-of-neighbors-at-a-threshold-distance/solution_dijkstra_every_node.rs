use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn find_the_city(n: i32, edges: Vec<Vec<i32>>, distance_threshold: i32) -> i32 {
        let n = n as usize;
        // Mirror each undirected edge both ways, so every node can run its own
        // Dijkstra over the adjacency list and pay only for real edges.
        let mut adj = vec![Vec::new(); n];
        for e in &edges {
            let a = e[0] as usize;
            let b = e[1] as usize;
            let w = e[2];
            adj[a].push((b, w));
            adj[b].push((a, w));
        }
        let inf = i32::MAX / 2;
        let mut counts = vec![0usize; n];
        for src in 0..n {
            // Dijkstra from src: with positive weights the smallest tentative pop
            // is already final, so every node settles exactly once.
            let mut dist = vec![inf; n];
            dist[src] = 0;
            let mut heap = BinaryHeap::new();
            heap.push(Reverse((0, src)));
            while let Some(Reverse((d, u))) = heap.pop() {
                // Stale-entry guard: skip outdated heap records.
                if d > dist[u] {
                    continue;
                }
                for &(v, w) in &adj[u] {
                    // Relax only when the route strictly improves.
                    if d + w < dist[v] {
                        dist[v] = d + w;
                        heap.push(Reverse((d + w, v)));
                    }
                }
            }
            let mut count = 0;
            for v in 0..n {
                if v != src && dist[v] <= distance_threshold {
                    count += 1;
                }
            }
            counts[src] = count;
        }
        // Ascending scan with a strictly-smaller count (or equal count at a
        // larger index) implements the tie-break: greatest city number wins.
        let mut best_city = -1;
        let mut best_count = usize::MAX;
        for i in 0..n {
            let count = counts[i];
            if count < best_count || (count == best_count && (i as i32) > best_city) {
                best_city = i as i32;
                best_count = count;
            }
        }
        best_city
    }
}
