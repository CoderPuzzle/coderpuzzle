impl Solution {
    pub fn repair_cars(ranks: Vec<i32>, cars: i32) -> i64 {
        let mut min_rank: i64 = i64::MAX;
        for &r in &ranks {
            min_rank = min_rank.min(r as i64);
        }
        let cars64 = cars as i64;
        let feasible = |t: i64| -> bool {
            // Within budget t, a rank-r mechanic finishes r*n^2 <= t cars,
            // so its capacity is isqrt(t / r); sum capacities with early exit.
            let mut total: i64 = 0;
            for &r in &ranks {
                total += isqrt64(t / r as i64);
                if total >= cars64 {
                    return true;
                }
            }
            total >= cars64
        };
        // Feasibility is monotone in t (mechanics can idle), so binary search
        // the minimum feasible time. Upper bound: the best mechanic repairing
        // every car alone, min(ranks) * cars^2.
        let (mut lo, mut hi) = (1i64, min_rank * cars64 * cars64);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if feasible(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo
    }
}

fn isqrt64(x: i64) -> i64 {
    if x <= 0 {
        return 0;
    }
    let mut r = (x as f64).sqrt() as i64;
    while r > 0 && r.checked_mul(r).map_or(true, |v| v > x) {
        r -= 1;
    }
    while (r + 1).checked_mul(r + 1).map_or(false, |v| v <= x) {
        r += 1;
    }
    r
}
