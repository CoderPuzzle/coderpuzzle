impl Solution {
    pub fn min_operations_max_profit(customers: Vec<i32>, boarding_cost: i32, running_cost: i32) -> i32 {
        // Simulate one rotation at a time: consume the next arrivals (once
        // customers is exhausted, no more arrive), board up to four of
        // whoever is waiting, and track the running profit. best_profit
        // starts at 0 and only moves on a *strict* improvement, so the
        // first rotation to reach the eventual maximum is the one kept —
        // matching "return the minimum number of rotations" on ties.
        let mut waiting = 0i32;
        let mut boarded = 0i32;
        let mut best_profit = 0i32;
        let mut best_rotation = -1i32;
        let mut rotation = 0i32;
        let n = customers.len();
        let mut index = 0usize;
        while index < n || waiting > 0 {
            if index < n {
                waiting += customers[index];
                index += 1;
            }
            let board = waiting.min(4);
            waiting -= board;
            boarded += board;
            rotation += 1;
            let profit = boarded * boarding_cost - rotation * running_cost;
            if profit > best_profit {
                best_profit = profit;
                best_rotation = rotation;
            }
        }
        if best_profit > 0 {
            best_rotation
        } else {
            -1
        }
    }
}
