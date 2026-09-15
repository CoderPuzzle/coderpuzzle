impl Solution {
    pub fn open_lock(deadends: Vec<String>, target: String) -> i32 {
        // BFS over the 10,000 four-digit lock states, one edge per
        // wheel turn: layer order equals turn count, so reaching the
        // target first is optimal.
        let dead: std::collections::HashSet<&str> = deadends.iter().map(|s| s.as_str()).collect();
        let target = target.as_str();
        let start = "0000".to_string();
        // A deadend start means the wheels can never move.
        if dead.contains(start.as_str()) {
            return -1;
        }
        let mut seen: std::collections::HashSet<String> = std::collections::HashSet::new();
        seen.insert(start.clone());
        let mut queue: std::collections::VecDeque<(String, i32)> = std::collections::VecDeque::new();
        queue.push_back((start, 0));
        while let Some((state, steps)) = queue.pop_front() {
            if state == target {
                return steps;
            }
            let bytes = state.as_bytes().to_vec();
            for i in 0..4usize {
                for delta in [1i32, -1i32] {
                    // Turn wheel i up or down, wrapping 0..9.
                    let digit = ((bytes[i] - b'0') as i32 + delta + 10) as u8 % 10;
                    let mut nxt = bytes.clone();
                    nxt[i] = b'0' + digit;
                    let nxt = String::from_utf8(nxt).unwrap();
                    // Mark seen at enqueue time so each state enters
                    // the queue once; never step on a deadend.
                    if !seen.contains(&nxt) && !dead.contains(nxt.as_str()) {
                        seen.insert(nxt.clone());
                        queue.push_back((nxt, steps + 1));
                    }
                }
            }
        }
        // Queue exhausted: every neighbor is seen or dead, so the lock
        // cannot be opened.
        -1
    }
}
