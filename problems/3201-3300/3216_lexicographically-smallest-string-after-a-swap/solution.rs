impl Solution {
    // String offers no in-place index writes, so the scan runs on a byte
    // vector — the honest equivalent of the in-place algorithm. The first
    // adjacent same-parity descent is the only swap worth making: it lowers
    // an earlier position than any later legal swap could.
    pub fn get_smallest_string(s: String) -> String {
        let mut chars = s.into_bytes();
        let n = chars.len();
        for i in 0..n.saturating_sub(1) {
            if chars[i] > chars[i + 1] && (chars[i] - b'0') % 2 == (chars[i + 1] - b'0') % 2 {
                // At most one swap is allowed, so stop right after it.
                chars.swap(i, i + 1);
                break;
            }
        }
        String::from_utf8(chars).unwrap()
    }
}
