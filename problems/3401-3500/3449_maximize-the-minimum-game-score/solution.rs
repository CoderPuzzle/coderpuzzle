impl Solution {
    pub fn max_score(points: Vec<i32>, m: i32) -> i64 {
        let n = points.len();
        let m = m as i64;
        let feasible = |target: i64| -> bool {
            // an optimal walk for a fixed target never backtracks more than one
            // step: sweep left to right, bouncing across the i/i+1 boundary
            let mut moves: i64 = 0;
            // visits already banked at i by the bounce around the previous boundary
            let mut prev: i64 = 0;
            for i in 0..n {
                let gp = points[i] as i64;
                // visits still needed at i after crediting the banked ones
                let remain = (target + gp - 1) / gp - prev;
                if remain >= 1 {
                    // 2*remain-1 moves buy remain visits here, banking remain-1 at i+1
                    prev = remain - 1;
                    moves += 2 * remain - 1;
                } else if i != n - 1 {
                    // quota already met: a single forward move, nothing banked
                    prev = 0;
                    moves += 1;
                }
                if moves > m {
                    return false;
                }
            }
            moves <= m
        };
        let mut hi: i64 = 0;
        for &p in &points {
            let v = (p as i64) * m;
            if v > hi {
                hi = v;
            }
        }
        let mut lo: i64 = 0;
        // feasibility is monotone in the target: binary search the largest achievable one
        while lo < hi {
            let mid = lo + (hi - lo + 1) / 2;
            if feasible(mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo
    }
}
