impl Solution {
    // The three signal states are exact conditions on the remaining seconds:
    // Green only at 0, Orange only at 30, Red strictly inside (30, 90].
    pub fn traffic_signal(timer: i32) -> String {
        if timer == 0 {
            return "Green".to_string();
        }
        if timer == 30 {
            return "Orange".to_string();
        }
        if timer > 30 && timer <= 90 {
            return "Red".to_string();
        }
        "Invalid".to_string()
    }
}
