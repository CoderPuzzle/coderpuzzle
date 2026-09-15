use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn minimum_cost(
        source: String,
        target: String,
        original: Vec<String>,
        changed: Vec<String>,
        cost: Vec<i32>,
    ) -> i64 {
        // A conversion rule is a directed edge in the 26-letter cost graph;
        // the cheapest a->b conversion is the shortest path a->b.
        let mut adj = vec![Vec::new(); 26];
        for e in 0..original.len() {
            let a = (original[e].as_bytes()[0] - b'a') as usize;
            let b = (changed[e].as_bytes()[0] - b'a') as usize;
            let w = cost[e] as i64;
            // Duplicate rules for the same pair need no care: the relaxation test keeps the cheaper copy.
            adj[a].push((b, w));
        }
        const INF: i64 = i64::MAX / 4;
        let mut dist = [[INF; 26]; 26];
        for src in 0..26 {
            // Dijkstra from src: with positive costs the smallest tentative pop
            // is already final, so every letter settles exactly once.
            let row = &mut dist[src];
            row[src] = 0;
            let mut heap: BinaryHeap<Reverse<(i64, usize)>> = BinaryHeap::new();
            heap.push(Reverse((0, src)));
            while let Some(Reverse((d, u))) = heap.pop() {
                // Stale-entry guard: skip outdated heap records.
                if d > row[u] {
                    continue;
                }
                for &(v, w) in &adj[u] {
                    let nd = d + w;
                    // Relax only when the route strictly improves.
                    if nd < row[v] {
                        row[v] = nd;
                        heap.push(Reverse((nd, v)));
                    }
                }
            }
        }
        let sb = source.as_bytes();
        let tb = target.as_bytes();
        // Matching characters convert for free; one unreachable pair fails all.
        let mut total: i64 = 0;
        for p in 0..sb.len() {
            let s = (sb[p] - b'a') as usize;
            let t = (tb[p] - b'a') as usize;
            if s == t {
                continue;
            }
            let d = dist[s][t];
            if d == INF {
                return -1;
            }
            total += d;
        }
        total
    }
}
