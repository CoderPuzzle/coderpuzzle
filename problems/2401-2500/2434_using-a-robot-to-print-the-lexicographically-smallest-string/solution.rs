impl Solution {
    pub fn robot_with_string(s: String) -> String {
        let bytes = s.as_bytes();
        let n = bytes.len();
        // t behaves as a stack: characters enter in s's order and leave
        // from the end, so the paper receives some pop sequence.
        // suffix_min[i] = smallest char still to arrive from s[i:]; the
        // sentinel at n exceeds every letter and also serves the drain.
        let mut suffix_min = vec![127u8; n + 1];
        for i in (0..n).rev() {
            suffix_min[i] = bytes[i].min(suffix_min[i + 1]);
        }
        let mut stack: Vec<u8> = Vec::new();
        let mut out: Vec<u8> = Vec::with_capacity(n);
        for i in 0..n {
            // Pop the top while nothing smaller remains unread: writing it
            // now is never wrong, since later arrivals are >= top.
            while let Some(&top) = stack.last() {
                if top <= suffix_min[i] {
                    out.push(top);
                    stack.pop();
                } else {
                    break;
                }
            }
            stack.push(bytes[i]);
        }
        // Input exhausted: flush the rest (the sentinel makes this the
        // same condition as the main loop).
        while let Some(top) = stack.pop() {
            out.push(top);
        }
        String::from_utf8(out).unwrap()
    }
}
