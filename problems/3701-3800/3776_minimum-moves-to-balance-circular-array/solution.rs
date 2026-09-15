impl Solution {
    pub fn min_moves(balance: Vec<i32>) -> i64 {
        // At most one person is negative. With none, nobody moves; with
        // a negative total, no arrangement can work. Otherwise every
        // unit a giver releases costs one move per hop of its circular
        // distance to the negative index, so draining the deficit from
        // the nearest givers first — cheapest distance, then the next,
        // and so on — totals the minimum. Moves reach ~1e14, hence i64.
        let neg = match balance.iter().position(|&v| v < 0) {
            Some(i) => i,
            None => return 0,
        };
        let total: i64 = balance.iter().map(|&v| v as i64).sum();
        if total < 0 {
            return -1;
        }
        let n = balance.len();
        let mut supplies: Vec<(usize, i64)> = Vec::new();
        for (i, &v) in balance.iter().enumerate() {
            if i != neg && v > 0 {
                let cw = (i + n - neg) % n;
                let ccw = (neg + n - i) % n;
                supplies.push((cw.min(ccw), v as i64));
            }
        }
        supplies.sort_unstable();
        let mut need = -(balance[neg] as i64);
        let mut moves: i64 = 0;
        for (dist, amount) in supplies {
            if need == 0 {
                break;
            }
            let take = amount.min(need);
            moves += take * dist as i64;
            need -= take;
        }
        moves
    }
}
