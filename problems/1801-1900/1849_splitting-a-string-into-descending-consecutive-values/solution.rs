impl Solution {
    // Fixing the first piece forces everything after it: each next piece
    // must read as exactly prev - 1. Leading zeros let several lengths
    // share one value, so backtrack over each matching length. A first
    // piece of 11+ digits cannot work: its successor alone needs 10+ of
    // the at most 9 leftover characters.
    pub fn split_string(s: String) -> bool {
        let bytes = s.as_bytes();
        let n = bytes.len();
        for first_end in 1..n.min(11) {
            let mut first: i64 = 0;
            for &b in &bytes[..first_end] {
                first = first * 10 + (b - b'0') as i64;
            }
            if Self::extend(bytes, first_end, first) {
                return true;
            }
        }
        false
    }

    fn extend(bytes: &[u8], pos: usize, prev: i64) -> bool {
        if pos == bytes.len() {
            return true;
        }
        let want = match prev.checked_sub(1) {
            Some(w) => w,
            None => return false,
        };
        if want < 0 {
            return false;
        }
        let mut v: i64 = 0;
        for end in pos + 1..=bytes.len() {
            v = v * 10 + (bytes[end - 1] - b'0') as i64;
            if v == want && Self::extend(bytes, end, want) {
                return true;
            }
            if v > want {
                break;
            }
        }
        return false;
    }
}
