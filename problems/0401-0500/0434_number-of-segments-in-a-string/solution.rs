impl Solution {
    // A segment starts exactly where a non-space character follows a
    // space — or where the string itself begins — so counting segments
    // is counting their first characters.
    pub fn count_segments(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut count = 0;
        // One left-to-right pass tests that boundary condition at every
        // position: leading, trailing, and repeated interior spaces never
        // register, and an empty string offers no position at all.
        for i in 0..bytes.len() {
            if bytes[i] != b' ' && (i == 0 || bytes[i - 1] == b' ') {
                count += 1;
            }
        }
        count
    }
}
