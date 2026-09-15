use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn count_paths(n: i32, roads: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        const MOD: i64 = 1_000_000_007;
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        for r in &roads {
            let u = r[0] as usize;
            let v = r[1] as usize;
            let t = r[2] as i64;
            adj[u].push((v, t));
            adj[v].push((u, t));
        }
        let mut dist = vec![i64::MAX; n];
        let mut ways = vec![0i64; n];
        dist[0] = 0;
        ways[0] = 1; // exactly one way to be at the source: the empty path
                     // min-heap of (dist, node)
        let mut heap: BinaryHeap<Reverse<(i64, usize)>> = BinaryHeap::new();
        heap.push(Reverse((0, 0)));
        // Positive weights => u is finalized only after every shortest path
        // into it was relaxed, so ways[u] is complete at pop time;
        // d > dist[u] just discards a stale heap entry.
        while let Some(Reverse((d, u))) = heap.pop() {
            if d > dist[u] {
                continue;
            }
            for &(v, t) in &adj[u] {
                let nd = d + t;
                if nd < dist[v] {
                    // Strictly shorter route: old path counts are obsolete, reset.
                    dist[v] = nd;
                    ways[v] = ways[u];
                    heap.push(Reverse((nd, v)));
                } else if nd == dist[v] {
                    // Equally short route: extend the count, not the distance.
                    ways[v] = (ways[v] + ways[u]) % MOD;
                }
            }
        }
        (ways[n - 1] % MOD) as i32
    }
}
