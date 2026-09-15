impl Solution {
    // cost(x) = k for x in [4^(k-1), 4^k): one "/4" step per band. An
    // operation performs two steps, so a query with S total steps over
    // [l, r] needs ceil(S / 2) operations; sum the steps per band.
    pub fn min_operations(queries: Vec<Vec<i32>>) -> i64 {
        let steps_up_to = |v: i64| -> i64 {
            let mut total = 0i64;
            let mut low = 1i64;
            let mut k = 1i64;
            while low <= v {
                let high = (low * 4 - 1).min(v);
                total += k * (high - low + 1);
                low *= 4;
                k += 1;
            }
            total
        };
        let mut ops = 0i64;
        for q in &queries {
            let s = steps_up_to(q[1] as i64) - steps_up_to(q[0] as i64 - 1);
            ops += (s + 1) / 2;
        }
        ops
    }
}
