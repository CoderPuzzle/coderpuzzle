// The stack holds the settled prefix: survivors with no close pair among
// them. A merge always deletes the right member, so the incoming char — the
// rightmost — either finds an equal survivor within distance k (its position
// is stack.len(), so the window is the last k survivors) and vanishes, or it
// settles on top. One sweep replays the rule.
impl Solution {
    pub fn merge_characters(s: String, k: i32) -> String {
        let bytes = s.into_bytes();
        let k = k as usize;
        let mut stack: Vec<u8> = Vec::with_capacity(bytes.len());
        for &c in &bytes {
            let lo = stack.len().saturating_sub(k);
            if stack[lo..].contains(&c) {
                continue;
            }
            stack.push(c);
        }
        String::from_utf8(stack).unwrap()
    }
}
