impl Solution {
    pub fn minimum_money(transactions: Vec<Vec<i32>>) -> i64 {
        let mut total_lose = 0i64;
        let mut max_cashback_losing = 0i64;
        let mut max_cost_winning = 0i64;
        for t in &transactions {
            let cost = t[0] as i64;
            let cashback = t[1] as i64;
            // losers (cashback < cost) drain money permanently; winners don't
            if cashback < cost {
                // losers' total drain is fixed regardless of ordering
                total_lose += cost - cashback;
                // worst order: largest-cashback loser goes last, after every
                // other drain, yet its full cost must still be covered
                if cashback > max_cashback_losing {
                    max_cashback_losing = cashback;
                }
            } else {
                // winners only matter via their largest upfront cost, paid at
                // the lowest-funds point (right after the losing block)
                if cost > max_cost_winning {
                    max_cost_winning = cost;
                }
            }
        }
        // answer = total_lose + max(last loser's cashback, top winner's cost)
        total_lose + max_cashback_losing.max(max_cost_winning)
    }
}
