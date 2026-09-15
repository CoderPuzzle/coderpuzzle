impl Solution {
    pub fn score_validator(events: Vec<String>) -> Vec<i32> {
        // Single left-to-right pass. Only "W" moves the counter, so it alone
        // can trigger the stop-at-10 rule; scoring events never stop anything.
        let mut score = 0i32;
        let mut counter = 0i32;
        for event in &events {
            match event.as_str() {
                "W" => counter += 1,
                "WD" | "NB" => score += 1,
                _ => score += (event.as_bytes()[0] - b'0') as i32,
            }
            // Events after the counter reaches 10 are ignored entirely.
            if counter == 10 {
                break;
            }
        }
        vec![score, counter]
    }
}
