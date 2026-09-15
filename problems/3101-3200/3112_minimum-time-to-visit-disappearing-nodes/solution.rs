use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn minimum_time(n: i32, edges: Vec<Vec<i32>>, disappear: Vec<i32>) -> Vec<i32> {
        // Dijkstra from node 0 with one extra rule: arriving at or after a
        // node's disappearance instant means it was never visited, so such a
        // settlement propagates nothing onward either. Every settled distance
        // is < 10^5 and every pushed candidate < 2 * 10^5, so i32 carries all.
        let n = n as usize;
        let mut adj: Vec<Vec<(usize, i32)>> = vec![Vec::new(); n];
        for e in &edges {
            let (u, v, w) = (e[0] as usize, e[1] as usize, e[2]);
            adj[u].push((v, w));
            adj[v].push((u, w));
        }
        const BIG: i32 = 1 << 29;
        let mut dist = vec![BIG; n];
        // Min-heap of (distance, node)
        let mut heap = BinaryHeap::new();
        dist[0] = 0;
        heap.push(Reverse((0i32, 0usize)));
        while let Some(Reverse((d, u))) = heap.pop() {
            if d != dist[u] {
                continue; // stale entry
            }
            if d >= disappear[u] {
                continue; // gone on arrival; cannot be visited
            }
            for &(v, w) in &adj[u] {
                if d + w < dist[v] {
                    dist[v] = d + w;
                    heap.push(Reverse((dist[v], v)));
                }
            }
        }
        let mut answer = vec![-1i32; n];
        for i in 0..n {
            if dist[i] < disappear[i] {
                answer[i] = dist[i];
            }
        }
        answer
    }
}
