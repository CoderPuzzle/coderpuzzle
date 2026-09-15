impl Solution {
    pub fn find_delayed_arrival_time(arrival_time: i32, delayed_time: i32) -> i32 {
        // Clock arithmetic: the 24-hour wrap is exactly the remainder of
        // arrival + delay by 24. The sum is at most 23 + 24 = 47, so one
        // modulo covers every wrap.
        (arrival_time + delayed_time) % 24
    }
}
