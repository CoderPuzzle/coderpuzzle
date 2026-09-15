impl Solution {
    pub fn max_depth(s: String) -> i32 {
        // s is guaranteed to be a VPS, so a running depth counter suffices:
        // '(' increments it, ')' decrements it, everything else is skipped.
        let mut depth = 0;
        let mut best = 0;
        for ch in s.chars() {
            if ch == '(' {
                depth += 1;
                best = best.max(depth);
            } else if ch == ')' {
                depth -= 1;
            }
        }
        best
    }
}
