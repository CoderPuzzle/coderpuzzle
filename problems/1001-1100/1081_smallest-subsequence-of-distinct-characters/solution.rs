impl Solution {
    pub fn smallest_subsequence(s: String) -> String {
        let bytes = s.as_bytes();
        let mut last = [-1i32; 26];
        for (i, &ch) in bytes.iter().enumerate() {
            last[(ch - b'a') as usize] = i as i32;
        }
        let mut used = [false; 26];
        let mut stack: Vec<u8> = Vec::with_capacity(26);
        for (i, &ch) in bytes.iter().enumerate() {
            let idx = (ch - b'a') as usize;
            if used[idx] {
                continue;
            }
            while let Some(&top) = stack.last() {
                let top_idx = (top - b'a') as usize;
                if top > ch && last[top_idx] > i as i32 {
                    used[top_idx] = false;
                    stack.pop();
                } else {
                    break;
                }
            }
            stack.push(ch);
            used[idx] = true;
        }
        String::from_utf8(stack).unwrap()
    }
}
