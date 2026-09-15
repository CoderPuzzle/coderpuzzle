impl Solution {
    // Walk the string once, keeping a stack of characters kept so far. A
    // new character only ever conflicts with the character directly above
    // it on the stack, because anything further down was already
    // separated from it by characters that didn't cancel. So comparing
    // against just the top is enough to reproduce the full repeated
    // removal process in a single pass.
    pub fn make_good(s: String) -> String {
        let mut stack: Vec<u8> = Vec::with_capacity(s.len());
        for ch in s.bytes() {
            let cancels = match stack.last() {
                Some(&top) => top != ch && top.to_ascii_lowercase() == ch.to_ascii_lowercase(),
                None => false,
            };
            if cancels {
                stack.pop();
            } else {
                stack.push(ch);
            }
        }
        String::from_utf8(stack).unwrap()
    }
}
