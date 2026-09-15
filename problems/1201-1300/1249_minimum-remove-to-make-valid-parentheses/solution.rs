impl Solution {
    pub fn min_remove_to_make_valid(s: String) -> String {
        let bytes = s.as_bytes();
        let mut keep = vec![true; bytes.len()];
        let mut opens: Vec<usize> = Vec::new(); // '(' still hoping for a partner
        for (i, &b) in bytes.iter().enumerate() {
            match b {
                b'(' => opens.push(i),
                b')' => {
                    if opens.pop().is_none() {
                        keep[i] = false; // orphan close, doomed
                    }
                }
                _ => {}
            }
        }
        for i in opens {
            keep[i] = false; // opens that never found a close
        }
        let mut out = String::with_capacity(bytes.len());
        for (i, &b) in bytes.iter().enumerate() {
            if keep[i] {
                out.push(b as char);
            }
        }
        out
    }
}
