impl Solution {
    pub fn decode_string(s: String) -> String {
        // One (previous_string, repeat_count) frame per unclosed '[' —
        // the stack mirrors the bracket structure, so context is never
        // lost no matter how deep the nesting goes.
        let mut stack: Vec<(String, usize)> = Vec::new();
        let mut current = String::new();
        let mut repeat: usize = 0;
        for ch in s.chars() {
            if ch.is_ascii_digit() {
                // Multi-digit counts assemble digit by digit.
                repeat = repeat * 10 + (ch as u8 - b'0') as usize;
            } else if ch == '[' {
                // Park the outer segment and its count; reset both for
                // the fresh inner segment.
                stack.push((current.clone(), repeat));
                current.clear();
                repeat = 0;
            } else if ch == ']' {
                // Absorb the finished inner segment: restore the outer
                // string, then repeat-and-append onto it.
                let (previous, times) = stack.pop().unwrap();
                let mut merged = previous;
                for _ in 0..times {
                    merged.push_str(&current);
                }
                current = merged;
            } else {
                current.push(ch);
            }
        }
        // Every bracket is closed, so the stack is empty and current is
        // the fully decoded string.
        current
    }
}
