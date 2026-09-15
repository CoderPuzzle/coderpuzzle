impl Solution {
    pub fn slowest_key(releaseTimes: Vec<i32>, keysPressed: String) -> String {
        // A single left-to-right scan computes each duration once and keeps
        // the best (longest duration, then lexicographically largest key).
        let keys: Vec<u8> = keysPressed.bytes().collect();
        let mut best_duration = releaseTimes[0];
        let mut best_char = keys[0];
        for i in 1..releaseTimes.len() {
            let duration = releaseTimes[i] - releaseTimes[i - 1];
            let c = keys[i];
            if duration > best_duration || (duration == best_duration && c > best_char) {
                best_duration = duration;
                best_char = c;
            }
        }
        (best_char as char).to_string()
    }
}
