impl Solution {
    pub fn find_replace_string(s: String, indices: Vec<i32>, sources: Vec<String>, targets: Vec<String>) -> String {
        // Replacements are simultaneous: each match is judged against the
        // original string, so first record every operation that succeeds —
        // sources[i] read from indices[i] — as a map from start position to
        // operation, then walk s once. A position holding a winner emits its
        // target and skips the consumed source; every other character copies
        // through unchanged. The non-overlap guarantee means a skip never
        // lands inside another winner's span.
        let s = s.as_bytes();
        let n = s.len();
        let mut match_at: Vec<i32> = vec![-1; n];
        for (op, &start) in indices.iter().enumerate() {
            let start = start as usize;
            let source = sources[op].as_bytes();
            if start + source.len() <= n && &s[start..start + source.len()] == source {
                match_at[start] = op as i32;
            }
        }
        let mut result = String::new();
        let mut i = 0;
        while i < n {
            let op = match_at[i];
            if op >= 0 {
                let op = op as usize;
                result.push_str(&targets[op]);
                i += sources[op].len();
            } else {
                result.push(s[i] as char);
                i += 1;
            }
        }
        result
    }
}
