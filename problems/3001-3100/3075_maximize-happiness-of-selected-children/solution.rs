impl Solution {
    pub fn maximum_happiness_sum(happiness: Vec<i32>, k: i32) -> i64 {
        // Every unselected child loses 1 per turn, so the child picked
        // in turn i (0-based) contributes its original value minus i,
        // floored at 0. Values only shrink while waiting, so taking the
        // largest available each turn is optimal. Widen to i64 before
        // accumulating: the total reaches 2e5 * 1e8 = 2e13, far past
        // what an i32 can hold.
        let mut values = happiness;
        values.sort_by(|a, b| b.cmp(a));
        let mut total: i64 = 0;
        for (turn, &value) in values.iter().enumerate().take(k as usize) {
            let adjusted = value as i64 - turn as i64;
            if adjusted > 0 {
                total += adjusted;
            }
        }
        total
    }
}
