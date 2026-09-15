impl Solution {
    pub fn shortest_sequence(rolls: Vec<i32>, k: i32) -> i32 {
        // A "complete window" (all k faces seen since the last reset)
        // extends coverage to sequences one roll longer.
        let mut seen = std::collections::HashSet::new();
        // answer = (#complete windows so far) + 1; starts at 1 because with
        // zero windows some face never rolled, so length 1 already fails.
        let mut answer = 1i32;
        for r in rolls {
            seen.insert(r);
            if seen.len() == k as usize {
                // Window complete: whatever prefix was matched inside it,
                // every next symbol is available after this point.
                answer += 1;
                seen.clear();
            }
        }
        // No complete set of faces remains, so a sequence of this length
        // cannot be matched as a subsequence.
        answer
    }
}
