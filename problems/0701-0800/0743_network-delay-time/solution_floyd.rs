impl Solution {
    pub fn network_delay_time(times: Vec<Vec<i32>>, n: i32, k: i32) -> i32 {
        const INF: i32 = 100_000_000;
        let n = n as usize;
        let k = k as usize;
        let mut d = vec![vec![INF; n + 1]; n + 1];
        for i in 1..=n {
            d[i][i] = 0;
        }
        for t in &times {
            let (u, v, w) = (t[0] as usize, t[1] as usize, t[2]);
            if w < d[u][v] {
                // keep the smallest parallel-edge weight
                d[u][v] = w;
            }
        }
        // Relax every path through each midpoint m: one shot gives all pairs.
        for m in 1..=n {
            for i in 1..=n {
                for j in 1..=n {
                    // The finite guards keep INF + INF from overflowing.
                    if d[i][m] < INF && d[m][j] < INF && d[i][m] + d[m][j] < d[i][j] {
                        d[i][j] = d[i][m] + d[m][j];
                    }
                }
            }
        }
        let mut best = 0;
        for j in 1..=n {
            // Anything still INF in row k is unreachable from the source.
            if d[k][j] >= INF {
                return -1;
            }
            if d[k][j] > best {
                best = d[k][j];
            }
        }
        best
    }
}
