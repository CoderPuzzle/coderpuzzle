impl Solution {
    pub fn remove_duplicate_letters(s: String) -> String {
        let bytes = s.as_bytes();
        // count[c] = occurrences of c strictly after the current position.
        let mut count = [0i32; 26];
        for &b in bytes {
            count[(b - b'a') as usize] += 1;
        }
        let mut stack: Vec<u8> = Vec::new();
        let mut in_stack = [false; 26];
        for &b in bytes {
            let c = (b - b'a') as usize;
            count[c] -= 1;
            // A letter already placed stays put: a second copy can never help.
            if in_stack[c] {
                continue;
            }
            // Local exchange: popping a larger top is safe exactly while it
            // still re-occurs later (count > 0), and only shrinks the prefix.
            while let Some(&top) = stack.last() {
                let t = (top - b'a') as usize;
                if t > c && count[t] > 0 {
                    in_stack[t] = false;
                    stack.pop();
                } else {
                    break;
                }
            }
            stack.push(b);
            in_stack[c] = true;
        }
        String::from_utf8(stack).unwrap()
    }
}
