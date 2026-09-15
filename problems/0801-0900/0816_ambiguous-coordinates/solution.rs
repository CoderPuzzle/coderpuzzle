impl Solution {
    pub fn ambiguous_coordinates(s: String) -> Vec<String> {
        let t = &s[1..s.len() - 1];
        let mut result: Vec<String> = Vec::new();
        for i in 1..t.len() {
            let lefts = forms(&t[..i]);
            if lefts.is_empty() {
                continue;
            }
            let rights = forms(&t[i..]);
            if rights.is_empty() {
                continue;
            }
            for a in &lefts {
                for b in &rights {
                    result.push(format!("({}, {})", a, b));
                }
            }
        }
        result
    }
}

// Every valid rendering of the digit run t, in the statement's pinned order:
// decimal forms first, point moving right, then the plain integer last.
fn forms(t: &str) -> Vec<String> {
    let bytes = t.as_bytes();
    let mut out = Vec::new();
    for k in 1..t.len() {
        // The whole part may not open with '0' unless it is exactly "0" (that
        // is, k == 1), and the fractional part may not end in '0'.
        if k > 1 && bytes[0] == b'0' {
            continue;
        }
        if bytes[t.len() - 1] == b'0' {
            continue;
        }
        out.push(format!("{}.{}", &t[..k], &t[k..]));
    }
    if t.len() == 1 || bytes[0] != b'0' {
        out.push(t.to_string());
    }
    out
}
