impl Solution {
    pub fn have_conflict(event1: Vec<String>, event2: Vec<String>) -> bool {
        // Each "HH:MM" is one minute-of-day integer, so each event is an
        // inclusive integer interval. Two inclusive intervals intersect
        // exactly when neither starts after the other ends.
        let to_minutes = |time: &str| -> i32 {
            let bytes = time.as_bytes();
            (bytes[0] - b'0') as i32 * 600
                + (bytes[1] - b'0') as i32 * 60
                + (bytes[3] - b'0') as i32 * 10
                + (bytes[4] - b'0') as i32
        };
        let start1 = to_minutes(&event1[0]);
        let end1 = to_minutes(&event1[1]);
        let start2 = to_minutes(&event2[0]);
        let end2 = to_minutes(&event2[1]);
        start1 <= end2 && start2 <= end1
    }
}
