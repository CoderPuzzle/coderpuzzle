impl Solution {
    pub fn find_min_difference(time_points: Vec<String>) -> i32 {
        // Only 24*60 distinct minute marks exist, so convert each "HH:MM"
        // once and sort: the closest pair must be adjacent in sorted order.
        let mut minutes: Vec<i32> = time_points
            .iter()
            .map(|time| {
                let hours: i32 = time[..2].parse().unwrap();
                let minutes: i32 = time[3..].parse().unwrap();
                hours * 60 + minutes
            })
            .collect();
        minutes.sort_unstable();
        // The clock wraps, so the first and last marks are also a pair —
        // the one that spans midnight; its gap is first + 1440 - last.
        let mut best = minutes[0] + 24 * 60 - minutes[minutes.len() - 1];
        for index in 1..minutes.len() {
            best = best.min(minutes[index] - minutes[index - 1]);
        }
        best
    }
}
