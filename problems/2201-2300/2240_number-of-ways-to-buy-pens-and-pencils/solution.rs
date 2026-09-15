impl Solution {
    pub fn ways_to_buy_pens_pencils(total: i32, cost1: i32, cost2: i32) -> i64 {
        let total = total as i64;
        let cost1 = cost1 as i64;
        let cost2 = cost2 as i64;
        let mut ways = 0i64;
        for pens in 0..=total / cost1 {
            let remaining = total - pens * cost1;
            ways += remaining / cost2 + 1;
        }
        ways
    }
}
