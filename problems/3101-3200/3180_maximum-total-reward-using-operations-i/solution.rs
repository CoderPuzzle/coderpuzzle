impl Solution {
    pub fn max_total_reward(reward_values: Vec<i32>) -> i32 {
        // Every legal play takes its rewards in strictly increasing
        // value order — the next value must exceed a running total that
        // already contains everything taken before it — and two copies
        // of the same value can never both be used. So after sorting,
        // reachable[t] tracks achievable totals: value v extends
        // exactly from totals t < v, scanned descending so each copy is
        // used at most once. Totals stay below 2 * max <= 4000 because
        // the last pick exceeds everything collected before it.
        let mut vals = reward_values.clone();
        vals.sort_unstable();
        let cap = 2 * *vals.last().unwrap() as usize;
        let mut reachable = vec![false; cap + 1];
        reachable[0] = true;
        let mut best = 0usize;
        for &v in &vals {
            let v = v as usize;
            let top = best.min(v - 1);
            for t in (0..=top).rev() {
                if !reachable[t] {
                    continue;
                }
                reachable[t + v] = true;
                best = best.max(t + v);
            }
        }
        best as i32
    }
}
