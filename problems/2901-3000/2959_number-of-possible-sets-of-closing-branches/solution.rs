impl Solution {
    // n <= 10, so every closing set fits in a bitmask. Seed one matrix with
    // the minimum weight per pair (multiple roads are allowed); for each
    // candidate mask copy it and relax only through branches that survive —
    // a shortest path between survivors never needs a closed intermediate.
    // The set counts when every surviving pair is within maxDistance, and
    // leaving zero or one branch alive passes vacuously.
    pub fn number_of_sets(n: i32, max_distance: i32, roads: Vec<Vec<i32>>) -> i32 {
        const INF: i32 = 100_000_000; // above any legal max_distance; INF + INF fits
        let n = n as usize;
        let mut weight = vec![vec![INF; n]; n];
        for branch in 0..n {
            weight[branch][branch] = 0;
        }
        for road in &roads {
            let (u, v, w) = (road[0] as usize, road[1] as usize, road[2]);
            weight[u][v] = weight[u][v].min(w);
            weight[v][u] = weight[u][v];
        }
        let mut count = 0;
        for closed in 0..(1u32 << n) {
            let mut dist = weight.clone();
            for k in 0..n {
                if closed >> k & 1 == 1 {
                    continue;
                }
                for i in 0..n {
                    let through = dist[i][k];
                    if through >= INF {
                        continue;
                    }
                    for j in 0..n {
                        if through + dist[k][j] < dist[i][j] {
                            dist[i][j] = through + dist[k][j];
                        }
                    }
                }
            }
            let mut ok = true;
            'check: for i in 0..n {
                if closed >> i & 1 == 1 {
                    continue;
                }
                for j in 0..n {
                    if closed >> j & 1 == 0 && dist[i][j] > max_distance {
                        ok = false;
                        break 'check;
                    }
                }
            }
            if ok {
                count += 1;
            }
        }
        count
    }
}
