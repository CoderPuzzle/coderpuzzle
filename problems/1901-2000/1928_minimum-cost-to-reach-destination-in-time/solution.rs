impl Solution {
    pub fn min_cost(max_time: i32, edges: Vec<Vec<i32>>, passing_fees: Vec<i32>) -> i32 {
        let n = passing_fees.len();
        let max_time = max_time as usize;
        const INF: i64 = 1 << 40;
        // Unfold the graph into layers indexed by exact arrival time:
        // layers[t][c] = min fee of any walk from city 0 arriving at c at
        // minute t exactly. Within one time layer, minimizing cost is
        // well-defined, so revisiting a city at a different time stays legal.
        let mut layers: Vec<Vec<i64>> = vec![Vec::new(); max_time + 1];
        let mut start = vec![INF; n];
        start[0] = passing_fees[0] as i64;
        layers[0] = start;
        for t in 1..=max_time {
            let mut cur = vec![INF; n];
            for e in &edges {
                let (x, y, dt) = (e[0] as usize, e[1] as usize, e[2] as usize);
                if dt > t {
                    continue; // edge cannot fit in the elapsed time
                }
                // Relax both directions from the layer exactly dt minutes ago.
                let prev = &layers[t - dt];
                let fy = passing_fees[y] as i64;
                let fx = passing_fees[x] as i64;
                if prev[x] < INF && prev[x] + fy < cur[y] {
                    cur[y] = prev[x] + fy;
                }
                if prev[y] < INF && prev[y] + fx < cur[x] {
                    cur[x] = prev[y] + fx;
                }
            }
            layers[t] = cur;
        }
        // Destination may be reached before maxTime: take the min over all
        // time layers; all-infinity means no feasible walk.
        let mut best = INF;
        for layer in &layers {
            if layer[n - 1] < best {
                best = layer[n - 1];
            }
        }
        if best >= INF {
            -1
        } else {
            best as i32
        }
    }
}
