impl Solution {
    pub fn minimum_costs(regular: Vec<i32>, express: Vec<i32>, express_cost: i32) -> Vec<i64> {
        // Track the cheapest cost to reach the previous stop on each route;
        // at stop 0 only the regular seat exists, so exp starts unreachable
        // (a huge sentinel). Dropping express -> regular is free; boarding
        // regular -> express costs express_cost every time. Totals reach
        // ~2e10, so every cost is carried in i64, never in i32.
        let inf: i64 = 1 << 60;
        let mut reg: i64 = 0;
        let mut exp: i64 = inf;
        let mut costs = Vec::with_capacity(regular.len());
        for i in 0..regular.len() {
            let new_reg = reg.min(exp) + regular[i] as i64;
            let new_exp = (reg + express_cost as i64).min(exp) + express[i] as i64;
            reg = new_reg;
            exp = new_exp;
            costs.push(reg.min(exp));
        }
        costs
    }
}
