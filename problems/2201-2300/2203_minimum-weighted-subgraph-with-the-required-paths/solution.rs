use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    fn dijkstra(n: usize, adj: &Vec<Vec<(usize, i64)>>, src: usize) -> Vec<i64> {
        let inf = i64::MAX;
        let mut dist = vec![inf; n];
        dist[src] = 0;
        let mut heap: BinaryHeap<Reverse<(i64, usize)>> = BinaryHeap::new();
        heap.push(Reverse((0, src)));
        while let Some(Reverse((d, u))) = heap.pop() {
            if d > dist[u] {
                continue; // lazy deletion: stale heap entry
            }
            for &(v, w) in &adj[u] {
                let nd = d + w;
                if nd < dist[v] {
                    dist[v] = nd;
                    heap.push(Reverse((nd, v)));
                }
            }
        }
        dist
    }

    pub fn minimum_weight(n: i32, edges: Vec<Vec<i32>>, src1: i32, src2: i32, dest: i32) -> i64 {
        let n = n as usize;
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        let mut radj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        for e in &edges {
            let (u, v, w) = (e[0] as usize, e[1] as usize, e[2] as i64);
            adj[u].push((v, w));
            // reverse adjacency: a search from dest on radj yields dist(v, dest)
            radj[v].push((u, w));
        }
        // optimal paths from src1 and src2 meet at some node v and share v->dest
        let d1 = Self::dijkstra(n, &adj, src1 as usize);
        let d2 = Self::dijkstra(n, &adj, src2 as usize);
        let dd = Self::dijkstra(n, &radj, dest as usize);
        // the shared v->dest segment counts once: independent distances, added
        let inf = i64::MAX;
        let mut best = inf;
        for v in 0..n {
            // skip any v on a missing leg; none can lie on a valid subgraph
            if dd[v] < inf && d1[v] < inf && d2[v] < inf {
                let total = d1[v] + d2[v] + dd[v];
                if total < best {
                    best = total;
                }
            }
        }
        if best == inf {
            -1
        } else {
            best
        }
    }
}
