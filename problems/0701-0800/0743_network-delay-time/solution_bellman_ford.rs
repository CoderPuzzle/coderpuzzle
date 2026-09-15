impl Solution {
    pub fn network_delay_time(times: Vec<Vec<i32>>, n: i32, k: i32) -> i32 {
        const INF: i32 = 100_000_000;
        let mut dist = vec![INF; (n + 1) as usize];
        dist[k as usize] = 0;
        // Each round extends shortest paths by one edge, so n-1 rounds suffice.
        for _ in 0..n - 1 {
            let mut changed = false;
            for t in &times {
                let (u, v, w) = (t[0] as usize, t[1] as usize, t[2]);
                // The dist[u] finite guard keeps INF + w from overflowing.
                if dist[u] < INF && dist[u] + w < dist[v] {
                    dist[v] = dist[u] + w;
                    changed = true;
                }
            }
            // A round that relaxes nothing means the distances are final.
            if !changed {
                break;
            }
        }
        let mut best = 0;
        for i in 1..=(n as usize) {
            // Anything still at INF is unreachable from k.
            if dist[i] >= INF {
                return -1;
            }
            if dist[i] > best {
                best = dist[i];
            }
        }
        best
    }
}
