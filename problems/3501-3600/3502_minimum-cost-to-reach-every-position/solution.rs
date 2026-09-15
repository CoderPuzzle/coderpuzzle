impl Solution {
    pub fn min_costs(cost: Vec<i32>) -> Vec<i32> {
        // Reaching position i costs no more than the cheapest swap among
        // people 0..i: swap into the cheapest position, then every later
        // position (being behind you) is free.
        let mut ans: Vec<i32> = Vec::with_capacity(cost.len());
        let mut best = cost[0];
        for &value in &cost {
            if value < best {
                best = value;
            }
            ans.push(best);
        }
        ans
    }
}
