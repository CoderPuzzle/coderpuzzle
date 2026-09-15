impl Solution {
    pub fn process_str(s: String, k: i64) -> String {
        // First pass: the length of the result after each prefix. '#' doubles
        // it, '*' drops one (never below zero), a letter adds one, '%' leaves
        // it untouched. The result can reach 10^15 characters, so the string
        // itself is never built - only these lengths are kept.
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut length = vec![0i64; n + 1];
        for i in 0..n {
            let ch = bytes[i];
            if ch == b'*' {
                length[i + 1] = (length[i] - 1).max(0);
            } else if ch == b'#' {
                length[i + 1] = length[i] * 2;
            } else if ch == b'%' {
                length[i + 1] = length[i];
            } else {
                length[i + 1] = length[i] + 1;
            }
        }
        if k >= length[n] {
            return ".".to_string();
        }
        // Walk backwards, undoing each operation to map position k of the
        // final string back to the letter that produced it. The length array
        // pins down where each duplication and reversal boundary sits, so
        // every step is arithmetic, not string work.
        let mut pos = k;
        for i in (0..n).rev() {
            let ch = bytes[i];
            if ch == b'*' {
                // Removing the tail keeps every earlier position.
            } else if ch == b'#' {
                let half = length[i];
                if pos >= half {
                    pos -= half;
                }
            } else if ch == b'%' {
                pos = length[i] - 1 - pos;
            } else if pos == length[i] {
                return (ch as char).to_string();
            }
        }
        ".".to_string()
    }
}
