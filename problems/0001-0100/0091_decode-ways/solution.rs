impl Solution {
    pub fn num_decodings(s: String) -> i32 {
        // prev2 / prev1 count the decodings of the prefixes ending two and one
        // position back; only those two feed the next position, so the full
        // prefix table collapses into two rolling variables. Prefix counts can
        // pass 2^31 even when the final answer fits, hence i64 throughout.
        let bytes = s.as_bytes();
        let mut prev2: i64 = 1; // empty prefix: exactly one way to decode nothing
        let mut prev1: i64 = if bytes[0] != b'0' { 1 } else { 0 };
        for i in 1..bytes.len() {
            let mut current: i64 = 0;
            // One digit s[i]: a valid code on its own unless it is '0'.
            if bytes[i] != b'0' {
                current += prev1;
            }
            // Two digits s[i-1..i]: "1x" always, "2x" only up to "26".
            if bytes[i - 1] == b'1' || (bytes[i - 1] == b'2' && bytes[i] <= b'6') {
                current += prev2;
            }
            prev2 = prev1;
            prev1 = current;
        }
        prev1 as i32
    }
}
