impl Solution {
    pub fn find_cheapest_price(n: i32, flights: Vec<Vec<i32>>, src: i32, dst: i32, k: i32) -> i32 {
        let n = n as usize;
        let src = src as usize;
        let dst = dst as usize;
        let inf = i32::MAX / 2;
        // After r full rounds, dist[v] is the cheapest fare using at
        // most r edges; k stops allow k+1 flights, so run k+1 rounds.
        let mut dist = vec![inf; n];
        dist[src] = 0;
        for _ in 0..(k + 1) {
            // Relax from a frozen copy: writing in place would chain
            // several edges inside one round and exceed the stop limit.
            let mut ndist = dist.clone();
            let mut changed = false;
            for flight in &flights {
                let f = flight[0] as usize;
                let t = flight[1] as usize;
                let price = flight[2];
                if dist[f].saturating_add(price) < ndist[t] {
                    ndist[t] = dist[f] + price;
                    changed = true;
                }
            }
            dist = ndist;
            // A round that changed nothing never improves later rounds.
            if !changed {
                break;
            }
        }
        // A surviving infinity means the destination is unreachable
        // within the allowance.
        if dist[dst] >= inf {
            -1
        } else {
            dist[dst]
        }
    }
}
