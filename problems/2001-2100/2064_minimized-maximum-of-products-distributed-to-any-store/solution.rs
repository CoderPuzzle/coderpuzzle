impl Solution {
    pub fn minimized_maximum(n: i32, quantities: Vec<i32>) -> i32 {
        // A store holds one product type only, so a type with q items needs
        // ceil(q/x) stores; integer arithmetic avoids floats.
        let stores_needed = |x: i64| -> i64 {
            let mut total: i64 = 0;
            for &q in &quantities {
                total += (q as i64 + x - 1) / x;
            }
            total
        };

        // Feasibility is monotone in the cap x, so binary-search the
        // smallest feasible one. hi = max(quantities) is always feasible
        // (one store can take an entire product type).
        let mut lo: i64 = 1;
        let mut hi: i64 = *quantities.iter().max().unwrap() as i64;
        // Invariant: lo possibly too small, hi known feasible; the sum check
        // uses <= n since leftover stores may receive nothing.
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if stores_needed(mid) <= n as i64 {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
