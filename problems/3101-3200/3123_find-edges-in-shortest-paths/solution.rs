use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn find_answer(n: i32, edges: Vec<Vec<i32>>) -> Vec<bool> {
        let n = n as usize;
        let mut adj: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n];
        for e in &edges {
            let (u, v, w) = (e[0] as usize, e[1] as usize, e[2] as i64);
            adj[u].push((v, w));
            adj[v].push((u, w));
        }

        let inf = i64::MAX / 4;
        let dijkstra = |src: usize| -> Vec<i64> {
            let mut dist = vec![inf; n];
            dist[src] = 0;
            let mut pq: BinaryHeap<Reverse<(i64, usize)>> = BinaryHeap::new();
            pq.push(Reverse((0, src)));
            while let Some(Reverse((d, u))) = pq.pop() {
                // stale entry: dist[u] was improved after this was pushed
                if d != dist[u] {
                    continue;
                }
                for &(v, w) in &adj[u] {
                    let nd = d + w;
                    if nd < dist[v] {
                        dist[v] = nd;
                        pq.push(Reverse((nd, v)));
                    }
                }
            }
            dist
        };

        let dist0 = dijkstra(0);
        let dist_n = dijkstra(n - 1);
        // reference length every shortest 0 -> n-1 path must match
        let total = dist0[n - 1];

        let mut ans = vec![false; edges.len()];
        // unreachable: no edge lies on a shortest path
        if total == inf {
            return ans;
        }
        for (i, e) in edges.iter().enumerate() {
            let (u, v, w) = (e[0] as usize, e[1] as usize, e[2] as i64);
            // on a shortest path iff d0(one end) + w + dN(other end) == total,
            // tested both ways since the undirected edge may be crossed either way
            if dist0[u] + w + dist_n[v] == total || dist0[v] + w + dist_n[u] == total {
                ans[i] = true;
            }
        }
        ans
    }
}
