impl Solution {
    // Paint equidistant pairs (k, n-1-k) outside-in. dp[a][b] is the
    // cheapest way to paint every pair so far, ending with outer colors
    // (a, b) — 9 states, because a pair only constrains the two houses
    // it touches in the next pair. Totals reach 10^10, past 32-bit.
    pub fn min_cost(n: i32, cost: Vec<Vec<i32>>) -> i64 {
        const INF: i64 = 1 << 60;
        let n = n as usize;
        let mut dp = [[INF; 3]; 3];
        for a in 0..3 {
            for b in 0..3 {
                if a != b {
                    dp[a][b] = cost[0][a] as i64 + cost[n - 1][b] as i64;
                }
            }
        }
        for k in 1..n / 2 {
            let left = &cost[k];
            let right = &cost[n - 1 - k];
            // e[t][c]: best dp[t][b] over b != c — the previous right house
            // must differ from the new right one (adjacency on that side)
            let mut e = [[0i64; 3]; 3];
            for t in 0..3 {
                e[t][0] = dp[t][1].min(dp[t][2]);
                e[t][1] = dp[t][0].min(dp[t][2]);
                e[t][2] = dp[t][0].min(dp[t][1]);
            }
            let mut next = [[INF; 3]; 3];
            for a in 0..3 {
                for b in 0..3 {
                    // the diagonal stays unreachable: a pair's two houses
                    // are mirrors of each other and may not share a color
                    if a == b {
                        continue;
                    }
                    let mut best = INF;
                    // drop left color a so the new left house differs from
                    // the old one; column b was already excluded in e
                    for t in 0..3 {
                        if t != a {
                            best = best.min(e[t][b]);
                        }
                    }
                    next[a][b] = best + left[a] as i64 + right[b] as i64;
                }
            }
            dp = next;
        }
        let mut answer = INF;
        for a in 0..3 {
            for b in 0..3 {
                answer = answer.min(dp[a][b]);
            }
        }
        answer
    }
}
