impl Solution {
    pub fn ship_within_days(weights: Vec<i32>, days: i32) -> i32 {
        let feasible = |cap: i64| -> bool {
            let mut need = 1i64;
            let mut current = 0i64;
            // order fixed: greedily filling each day as full as possible
            // minimizes the day count, so this pass decides feasibility
            for &w in &weights {
                if current + w as i64 > cap {
                    need += 1;
                    if need > days as i64 {
                        return false;
                    }
                    current = w as i64;
                } else {
                    current += w as i64;
                }
            }
            true
        };

        // feasibility is monotone in capacity; lo must at least carry the
        // heaviest package, hi = total weight ships everything in one day
        let mut lo: i64 = 0;
        let mut hi: i64 = 0;
        for &w in &weights {
            lo = lo.max(w as i64);
            hi += w as i64;
        }
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            // hi always stays feasible, lo moves past infeasible midpoints,
            // so the loop ends on the least feasible capacity
            if feasible(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
