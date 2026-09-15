impl Solution {
    pub fn append_characters(s: String, t: String) -> i32 {
        // Match t from its start, scanning s once. Each time the current
        // characters agree, t advances; s advances on every step. The prefix
        // of t consumed this way is the longest one that is a subsequence of
        // s, so the unmatched tail of t is exactly what must be appended.
        let sb = s.as_bytes();
        let tb = t.as_bytes();
        let (mut i, mut j) = (0usize, 0usize);
        while i < sb.len() && j < tb.len() {
            if sb[i] == tb[j] {
                j += 1;
            }
            i += 1;
        }
        (tb.len() - j) as i32
    }
}
