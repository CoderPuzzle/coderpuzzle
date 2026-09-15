use std::collections::HashMap;

impl Solution {
    pub fn alert_names(keyName: Vec<String>, keyTime: Vec<String>) -> Vec<String> {
        // Group each worker's swipe times together; comparisons only ever
        // happen within one worker's own history.
        let mut times_by_name: HashMap<String, Vec<i32>> = HashMap::new();
        for (name, time) in keyName.into_iter().zip(keyTime.into_iter()) {
            let hours: i32 = time[0..2].parse().unwrap();
            let minutes: i32 = time[3..5].parse().unwrap();
            // Every swipe falls on a single day, so minutes-since-midnight is
            // all the arithmetic needed — no wraparound to handle.
            times_by_name
                .entry(name)
                .or_insert_with(Vec::new)
                .push(60 * hours + minutes);
        }

        let mut alerted = Vec::new();
        for (name, mut times) in times_by_name {
            times.sort_unstable();
            // A window of three consecutive swipes spans at most 60 minutes
            // exactly when the alert condition is met.
            for i in 0..times.len().saturating_sub(2) {
                if times[i + 2] - times[i] <= 60 {
                    alerted.push(name);
                    break;
                }
            }
        }

        alerted.sort_unstable();
        alerted
    }
}
