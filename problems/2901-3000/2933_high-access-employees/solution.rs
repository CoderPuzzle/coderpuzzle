use std::collections::HashMap;

impl Solution {
    pub fn find_high_access_employees(access_times: Vec<Vec<String>>) -> Vec<String> {
        // Bucket per employee; "HHMM" becomes 60 * HH + MM so the one-hour
        // rule is a plain integer span. After sorting a bucket, the employee
        // is high-access iff some three consecutive stamps span < 60: any
        // qualifying triple's earliest three members are consecutive, and a
        // consecutive triple under an hour is itself a witness.
        let mut buckets: HashMap<String, Vec<i32>> = HashMap::new();
        for entry in &access_times {
            let stamp = entry[1].as_bytes();
            let hh = 10 * (stamp[0] - b'0') + (stamp[1] - b'0');
            let mm = 10 * (stamp[2] - b'0') + (stamp[3] - b'0');
            buckets
                .entry(entry[0].clone())
                .or_default()
                .push(60 * hh as i32 + mm as i32);
        }
        let mut answer = Vec::new();
        for (name, minutes) in &mut buckets {
            minutes.sort_unstable();
            for window in minutes.windows(3) {
                if window[2] - window[0] < 60 {
                    answer.push(name.clone());
                    break;
                }
            }
        }
        answer
    }
}
