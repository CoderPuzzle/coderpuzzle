use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_cost(n: i32, roads: Vec<Vec<i32>>, apple_cost: Vec<i32>, k: i32) -> Vec<i32> {
        let n = n as usize;
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n + 1];
        for r in &roads {
            let a = r[0] as usize;
            let b = r[1] as usize;
            let w = r[2] as i64;
            adj[a].push((b, w));
            adj[b].push((a, w));
        }

        const INF: i64 = i64::MAX / 4;
        let mut answer = Vec::with_capacity(n);
        // A trip is: reach j, buy, retrace. Any cheaper return path would
        // also be a cheaper outbound path, so the total is
        // apple_cost[j] + (k+1)*d(j) with d = shortest distance from start.
        for start in 1..=n {
            // Dijkstra needs the strictly positive road weights; a popped
            // entry older than dist[u] is stale (lazy deletion).
            let mut dist = vec![INF; n + 1];
            dist[start] = 0;
            let mut heap: BinaryHeap<Reverse<(i64, usize)>> = BinaryHeap::new();
            heap.push(Reverse((0, start)));
            while let Some(Reverse((d, u))) = heap.pop() {
                if d > dist[u] {
                    continue;
                }
                for &(v, w) in &adj[u] {
                    let nd = d + w;
                    if nd < dist[v] {
                        dist[v] = nd;
                        heap.push(Reverse((nd, v)));
                    }
                }
            }
            // j = start contributes d = 0, so buying locally is always a
            // candidate.
            let mut best = INF;
            for j in 1..=n {
                let total = apple_cost[j - 1] as i64 + (k as i64 + 1) * dist[j];
                if total < best {
                    best = total;
                }
            }
            answer.push(best as i32);
        }
        answer
    }
}
