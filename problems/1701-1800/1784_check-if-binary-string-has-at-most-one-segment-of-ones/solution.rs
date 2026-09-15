impl Solution {
    pub fn check_ones_segment(s: String) -> bool {
        // A segment is a maximal run of ones; a new one starts wherever
        // a '1' follows a '0'. Bail out as soon as a second starts.
        let b = s.as_bytes();
        let mut segments = 0;
        for i in 0..b.len() {
            if b[i] == b'1' && (i == 0 || b[i - 1] == b'0') {
                segments += 1;
                if segments > 1 {
                    return false;
                }
            }
        }
        true
    }
}
