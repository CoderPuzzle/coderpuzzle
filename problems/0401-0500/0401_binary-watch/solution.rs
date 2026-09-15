impl Solution {
    pub fn read_binary_watch(turnedOn: i32) -> Vec<String> {
        // Hours outer, minutes inner: the walk emits the pinned chronological
        // order directly, with no post-sort.
        let mut times = Vec::new();
        for hour in 0i32..12 {
            for minute in 0i32..60 {
                // A time shows when its lit hour LEDs plus lit minute LEDs
                // equal turnedOn; each lit count is just a popcount.
                if (hour.count_ones() + minute.count_ones()) as i32 == turnedOn {
                    // "{}:{:02}": no hour leading zero, always two minute digits.
                    times.push(format!("{}:{:02}", hour, minute));
                }
            }
        }
        times
    }
}
