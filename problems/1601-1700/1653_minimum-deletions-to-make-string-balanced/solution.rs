impl Solution {
    pub fn minimum_deletions(s: String) -> i32 {
        // Cost of putting the a/b boundary right before index 0: delete
        // every 'a' (the whole string would sit in the b-region).
        let mut cost = s.bytes().filter(|&b| b == b'a').count() as i32;
        let mut best = cost;
        // Slide the boundary one character right at a time. Passing an
        // 'a' removes it from the future deletion cost; passing a 'b'
        // adds it, since it now sits left of the boundary.
        for byte in s.bytes() {
            if byte == b'a' {
                cost -= 1;
            } else {
                cost += 1;
            }
            best = best.min(cost);
        }
        best
    }
}
