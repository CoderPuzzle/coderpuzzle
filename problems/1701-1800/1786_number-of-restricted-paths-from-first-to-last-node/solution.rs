use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn count_restricted_paths(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        // Dijkstra from node n fixes dist[x] = distanceToLastNode(x). A
        // restricted path strictly decreases that distance at every step,
        // so visiting nodes in increasing distance order makes every count
        // final: each strictly-closer neighbor of u was visited before u.
        // Distances reach ~2*10^9 (n-1 edges of weight 10^5), so they are
        // held as i64.
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n + 1];
        for e in &edges {
            let (u, v, w) = (e[0] as usize, e[1] as usize, e[2] as i64);
            adj[u].push((v, w));
            adj[v].push((u, w));
        }
        // Reverse turns BinaryHeap's max-heap into a min-heap of
        // (distance, node); lazy deletion skips stale entries.
        let mut dist = vec![i64::MAX; n + 1];
        dist[n] = 0;
        let mut heap: BinaryHeap<Reverse<(i64, usize)>> = BinaryHeap::new();
        heap.push(Reverse((0, n)));
        while let Some(Reverse((d, u))) = heap.pop() {
            if d > dist[u] {
                continue;
            }
            for &(v, w) in &adj[u] {
                if d + w < dist[v] {
                    dist[v] = d + w;
                    heap.push(Reverse((d + w, v)));
                }
            }
        }
        let mut order: Vec<usize> = (1..=n).collect();
        order.sort_by_key(|&x| dist[x]);
        let mut count = vec![0i64; n + 1];
        count[n] = 1;
        for u in order {
            if u == n {
                continue;
            }
            let mut total: i64 = 0;
            for &(v, _) in &adj[u] {
                if dist[u] > dist[v] {
                    total += count[v];
                }
            }
            count[u] = total % MOD;
        }
        count[1] as i32
    }
}
