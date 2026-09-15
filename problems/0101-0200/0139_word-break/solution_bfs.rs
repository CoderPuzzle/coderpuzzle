use std::collections::{HashSet, VecDeque};

impl Solution {
    pub fn word_break(s: String, wordDict: Vec<String>) -> bool {
        let s = s.as_bytes();
        let n = s.len();
        let mut max_len = 0;
        let mut words: HashSet<&[u8]> = HashSet::new();
        for word in &wordDict {
            // Only words short enough to fit can ever be a next piece.
            max_len = max_len.max(word.len());
            words.insert(word.as_bytes());
        }
        // BFS over start indices: start positions reachable by segmenting a
        // prefix of s. visited keeps each index enqueued at most once.
        let mut visited = vec![false; n + 1];
        visited[0] = true;
        let mut queue: VecDeque<usize> = VecDeque::new();
        queue.push_back(0);
        while let Some(i) = queue.pop_front() {
            // Try every dictionary word as the next piece s[i..i+L).
            let limit = max_len.min(n - i);
            for length in 1..=limit {
                if words.contains(&s[i..i + length]) {
                    let end = i + length;
                    // Reaching the far end means the whole string segments.
                    if end == n {
                        return true;
                    }
                    if !visited[end] {
                        visited[end] = true;
                        queue.push_back(end);
                    }
                }
            }
        }
        // No reachable start ever crossed the finish line.
        false
    }
}
