impl Solution {
    pub fn remove_comments(source: Vec<String>) -> Vec<String> {
        // Each comment is decided by reading order — line by line, left to
        // right, first marker wins — so one pass with a single flag (inside
        // a block comment) and one buffer for the line under construction is
        // the whole computation. Entering or leaving a comment skips two
        // characters, so the closer of "/*/" never overlaps its opener. The
        // buffer flushes only when a line ends outside a block: an emptied
        // line is dropped, code before an opener joins code after its closer.
        let mut result: Vec<String> = Vec::new();
        let mut buffer = String::new();
        let mut in_block = false;
        for line in &source {
            let bytes = line.as_bytes();
            let mut i = 0;
            while i < bytes.len() {
                if in_block {
                    if i + 1 < bytes.len() && bytes[i] == b'*' && bytes[i + 1] == b'/' {
                        in_block = false;
                        i += 2;
                    } else {
                        i += 1;
                    }
                } else if i + 1 < bytes.len() && bytes[i] == b'/' && bytes[i + 1] == b'/' {
                    break;
                } else if i + 1 < bytes.len() && bytes[i] == b'/' && bytes[i + 1] == b'*' {
                    in_block = true;
                    i += 2;
                } else {
                    buffer.push(bytes[i] as char);
                    i += 1;
                }
            }
            if !in_block {
                if !buffer.is_empty() {
                    result.push(buffer.clone());
                }
                buffer.clear();
            }
        }
        result
    }
}
