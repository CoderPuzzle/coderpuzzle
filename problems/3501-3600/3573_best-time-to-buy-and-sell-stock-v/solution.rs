impl Solution {
    pub fn maximum_profit(prices: Vec<i32>, k: i32) -> i64 {
        // Per day, for each count t of completed transactions: done[t] =
        // flat, open_long[t] = holding a bought share, open_short[t] =
        // holding a shorted share. NEG marks impossible states.
        const NEG: i64 = -1_000_000_000_000_000;
        let k = k as usize;
        let mut done = vec![NEG; k + 1];
        let mut open_long = vec![NEG; k + 1];
        let mut open_short = vec![NEG; k + 1];
        done[0] = 0;
        for &price in &prices {
            let p = price as i64;
            // Closes today complete transaction t+1 from an open position.
            let mut nd = done.clone();
            for t in 0..k {
                nd[t + 1] = nd[t + 1].max(open_long[t] + p).max(open_short[t] - p);
            }
            // Opens read done[t] from BEFORE today's closes: a close and
            // the next open can never share a day (and an open can never
            // close the same day, since closes read the old open row).
            let mut nl = open_long.clone();
            let mut ns = open_short.clone();
            for t in 0..=k {
                nl[t] = nl[t].max(done[t] - p);
                ns[t] = ns[t].max(done[t] + p);
            }
            done = nd;
            open_long = nl;
            open_short = ns;
        }
        *done.iter().max().unwrap()
    }
}
