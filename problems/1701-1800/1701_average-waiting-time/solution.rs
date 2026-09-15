impl Solution {
    // Each customer's wait is settled the moment the previous order is
    // scheduled: the chef starts at max(free_at, arrival), finishes at
    // start + time, and the wait is finish - arrival. The arrivals are
    // sorted, so one forward sweep carrying the chef's free time replays
    // the whole day. The waits total as exact integers — the deepest
    // legal queue sums to about 5 * 10^13, past 32 bits — so the total is
    // accumulated in an i64 and the single division at the end is the
    // only floating-point step.
    pub fn average_waiting_time(customers: Vec<Vec<i32>>) -> f64 {
        let mut total_waiting = 0i64;
        let mut free_at = 0i64;
        for customer in &customers {
            let arrival = customer[0] as i64;
            let start = free_at.max(arrival);
            free_at = start + customer[1] as i64;
            total_waiting += free_at - arrival;
        }
        total_waiting as f64 / customers.len() as f64
    }
}
