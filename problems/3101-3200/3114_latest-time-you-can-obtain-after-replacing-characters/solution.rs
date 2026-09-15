impl Solution {
    pub fn find_latest_time(s: String) -> String {
        // Enumeration per the hint: try every one of the 12 * 60 legal times
        // in ascending order and keep the last pattern match; that last
        // match is the latest obtainable time.
        let bytes = s.as_bytes();
        let matches = |candidate: &str| {
            let cb = candidate.as_bytes();
            (0..5).all(|i| bytes[i] == b'?' || bytes[i] == cb[i])
        };
        let mut best = String::new();
        for hh in 0..12 {
            for mm in 0..60 {
                let candidate = format!("{:02}:{:02}", hh, mm);
                if matches(&candidate) {
                    best = candidate;
                }
            }
        }
        best
    }
}
