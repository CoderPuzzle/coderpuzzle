use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_time(n: i32, edges: Vec<Vec<i32>>) -> i32 {
        // Earliest-arrival Dijkstra: dist[u] is the soonest time you can be
        // standing on u. Waiting is always allowed, so an edge leaving u at
        // time t departs at max(t, start) — never later, because a later
        // departure only arrives later — provided that moment still lies
        // inside the edge's window. Times are held as i64.
        let n = n as usize;
        let mut adj: Vec<Vec<(usize, i64, i64)>> = vec![Vec::new(); n];
        for e in &edges {
            adj[e[0] as usize].push((e[1] as usize, e[2] as i64, e[3] as i64));
        }
        // Reverse turns BinaryHeap's max-heap into a min-heap of
        // (time, node); lazy deletion skips stale entries.
        let mut dist = vec![i64::MAX; n];
        dist[0] = 0;
        let mut heap: BinaryHeap<Reverse<(i64, usize)>> = BinaryHeap::new();
        heap.push(Reverse((0, 0)));
        while let Some(Reverse((t, u))) = heap.pop() {
            if t > dist[u] {
                continue;
            }
            for &(v, start, end) in &adj[u] {
                let depart = t.max(start);
                if depart <= end {
                    let arrive = depart + 1;
                    if arrive < dist[v] {
                        dist[v] = arrive;
                        heap.push(Reverse((arrive, v)));
                    }
                }
            }
        }
        if dist[n - 1] == i64::MAX {
            -1
        } else {
            dist[n - 1] as i32
        }
    }
}
