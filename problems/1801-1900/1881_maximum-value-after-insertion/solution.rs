impl Solution {
    // Positive: insert before the first digit < x (else append).
    // Negative: insert before the first digit > x (else append).
    pub fn max_value(n: String, x: i32) -> String {
        let d = b'0' + x as u8;
        let bytes = n.as_bytes();
        let neg = bytes[0] == b'-';
        let start = if neg { 1 } else { 0 };
        for i in start..bytes.len() {
            let better = if neg { bytes[i] > d } else { bytes[i] < d };
            if better {
                let mut out = String::with_capacity(n.len() + 1);
                out.push_str(&n[..i]);
                out.push(d as char);
                out.push_str(&n[i..]);
                return out;
            }
        }
        let mut out = n;
        out.push(d as char);
        out
    }
}
