impl Solution {
    pub fn remove_duplicates(s: String, k: i32) -> String {
        let k = k as usize;
        let mut stack: Vec<(u8, usize)> = Vec::new();
        for ch in s.bytes() {
            if let Some(last) = stack.last_mut() {
                if last.0 == ch {
                    last.1 += 1;
                    if last.1 == k {
                        stack.pop();
                    }
                    continue;
                }
            }
            stack.push((ch, 1));
        }
        let mut out = Vec::with_capacity(s.len());
        for (ch, count) in stack {
            for _ in 0..count {
                out.push(ch);
            }
        }
        String::from_utf8(out).unwrap()
    }
}
