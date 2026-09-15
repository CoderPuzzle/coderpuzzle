impl Solution {
    pub fn min_total_time(forward: Vec<i32>, backward: Vec<i32>, queries: Vec<i32>) -> i64 {
        // Prefix sums over both road sets. Forward distance a -> b walks
        // forward[a..], backward distance a -> b walks backward[a],
        // backward[a-1], ..., i.e. the descending edge weights. Each move
        // takes the cheaper of the two directions. Totals reach 1e5 moves x
        // 1e10 meters, far past 32 bits.
        let n = forward.len();
        let mut f = vec![0i64; n + 1];
        let mut b = vec![0i64; n + 1];
        for i in 0..n {
            f[i + 1] = f[i] + forward[i] as i64;
            b[i + 1] = b[i] + backward[i] as i64;
        }
        let (tf, tb) = (f[n], b[n]);
        let fwd_dist = |a: usize, bb: usize| -> i64 {
            if a < bb {
                f[bb] - f[a]
            } else {
                tf - f[a] + f[bb]
            }
        };
        // spends backward[a], backward[a-1], ..., backward[bb+1]
        let bwd_dist = |a: usize, bb: usize| -> i64 {
            if a > bb {
                b[a + 1] - b[bb + 1]
            } else {
                b[a + 1] + tb - b[bb + 1]
            }
        };
        let mut ans = 0i64;
        let mut prev = 0usize;
        for q in queries {
            let q = q as usize;
            ans += fwd_dist(prev, q).min(bwd_dist(prev, q));
            prev = q;
        }
        ans
    }
}
