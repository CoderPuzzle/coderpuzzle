impl Solution {
    pub fn network_delay_time(times: Vec<Vec<i32>>, n: i32, k: i32) -> i32 {
        let n = n as usize;
        let k = k as usize;
        let mut graph: Vec<Vec<(usize, i32)>> = vec![Vec::new(); n + 1];
        for t in &times {
            graph[t[0] as usize].push((t[1] as usize, t[2]));
        }

        let mut dist: Vec<Option<i32>> = vec![None; n + 1];
        let mut heap = std::collections::BinaryHeap::new();
        heap.push(std::cmp::Reverse((0i32, k)));
        while let Some(std::cmp::Reverse((d, u))) = heap.pop() {
            // Lazy stale-entry handling: skip nodes settled by an earlier pop.
            if dist[u].is_some() {
                continue;
            }
            // Non-negative weights make the first pop the true shortest
            // distance, so u is final now and never revisited.
            dist[u] = Some(d);
            for &(v, w) in &graph[u] {
                if dist[v].is_none() {
                    heap.push(std::cmp::Reverse((d + w, v)));
                }
            }
        }

        // Any node still unsettled is unreachable from k; otherwise the last
        // node to hear the signal sets the answer.
        let mut best = -1;
        for i in 1..=n {
            match dist[i] {
                None => return -1,
                Some(d) => {
                    if d > best {
                        best = d;
                    }
                }
            }
        }
        best
    }
}
