use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn minimum_cost(n: i32, connections: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        // adjacency over n+1 slots (index 0 unused; nodes are 1-based);
        // each link is filed once per direction
        let mut adj: Vec<Vec<(i32, usize)>> = vec![Vec::new(); n + 1];
        for l in &connections {
            adj[l[0] as usize].push((l[2], l[1] as usize));
            adj[l[1] as usize].push((l[2], l[0] as usize));
        }

        let mut visited = vec![false; n + 1];
        let mut total = 0i32;
        let mut settled = 0usize;
        // Prim: grow one tree outward from node 1; the cheapest offer
        // leaving the tree is always safe to buy
        let mut heap: BinaryHeap<Reverse<(i32, usize)>> = BinaryHeap::new();
        heap.push(Reverse((0, 1)));
        while settled < n {
            let Some(Reverse((cost, v))) = heap.pop() else { break };
            // stale-entry guard: v already joined via an offer at most
            // this cheap
            if visited[v] {
                continue;
            }
            visited[v] = true;
            total += cost;
            settled += 1;
            for &(w, u) in &adj[v] {
                if !visited[u] {
                    heap.push(Reverse((w, u)));
                }
            }
        }
        // queue drained before every node joined: the catalogue cannot
        // connect all n nodes
        if settled == n {
            total
        } else {
            -1
        }
    }
}
