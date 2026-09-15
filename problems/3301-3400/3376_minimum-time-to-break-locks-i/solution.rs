impl Solution {
    pub fn find_minimum_time(strength: Vec<i32>, k: i32) -> i32 {
        // Breaking lock i as the j-th lock (0-based) takes ceil(strength[i]
        // / (1 + j*k)) minutes, because the sword banks 1 + j*k energy per
        // minute. Which locks are already broken is all that matters, so a
        // bitmask DP works: best[mask] is the minimum minutes to break
        // exactly the locks in mask, and each unbroken lock i extends mask
        // at the cost of one ceil division by the next slot's factor
        // 1 + popcount*k. Every mask is finite before it is processed (its
        // submasks come first), so i32::MAX never overflows. n <= 8 keeps
        // this at a few thousand moves.
        let n = strength.len();
        let full = 1usize << n;
        let mut best = vec![i32::MAX; full];
        best[0] = 0;
        for mask in 0..full {
            let factor = 1 + mask.count_ones() as i32 * k;
            for i in 0..n {
                if mask >> i & 1 == 0 {
                    let cost = best[mask] + (strength[i] + factor - 1) / factor;
                    if cost < best[mask | 1 << i] {
                        best[mask | 1 << i] = cost;
                    }
                }
            }
        }
        best[full - 1]
    }
}
