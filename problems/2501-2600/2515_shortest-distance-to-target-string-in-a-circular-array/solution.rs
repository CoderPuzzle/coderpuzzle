impl Solution {
    pub fn closest_target(words: Vec<String>, target: String, start_index: i32) -> i32 {
        // Going either way around the ring, a match at distance d (forward)
        // is also n - d backward, so each matching index yields
        // min(d, n - d); take the smallest over all matches.
        let n = words.len() as i32;
        let mut best = -1;
        for (i, word) in words.iter().enumerate() {
            if word != &target {
                continue;
            }
            let gap = (i as i32 - start_index).abs();
            let d = gap.min(n - gap);
            if best == -1 || d < best {
                best = d;
            }
        }
        best
    }
}
