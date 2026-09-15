use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn reachable_nodes(edges: Vec<Vec<i32>>, max_moves: i32, n: i32) -> i32 {
        let n = n as usize;
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        // Subdividing [u, v, cnt] yields cnt + 1 unit edges, so Dijkstra on
        // the compact graph with weight cnt + 1 gives the true distances.
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            let cnt = e[2] as i64;
            adj[u].push((v, cnt + 1));
            adj[v].push((u, cnt + 1));
        }
        let max_moves = max_moves as i64;
        let INF = i64::MAX / 4;
        let mut dist = vec![INF; n];
        dist[0] = 0;
        let mut heap: BinaryHeap<Reverse<(i64, usize)>> = BinaryHeap::new();
        heap.push(Reverse((0, 0usize)));
        while let Some(Reverse((d, u))) = heap.pop() {
            // Lazy deletion: a stale heap entry no longer matches dist[u].
            if d != dist[u] {
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
        let mut result: i64 = 0;
        // Half one: original nodes within the budget.
        for &d in &dist {
            if d <= max_moves {
                result += 1;
            }
        }
        // Half two: each edge contributes the frontiers walked in from both
        // ends; min(cnt, a + b) clamps the overlap where they meet.
        for e in &edges {
            let u = e[0] as usize;
            let v = e[1] as usize;
            let cnt = e[2] as i64;
            let a = (max_moves - dist[u]).max(0);
            let b = (max_moves - dist[v]).max(0);
            result += cnt.min(a + b);
        }
        result as i32
    }
}
