impl Solution {
    // One left-to-right scan with a stack of open tag names. The outermost
    // tag is special: it must open at position 0 and its end tag must be the
    // last thing in the string, so any content seen while the stack is empty
    // is an immediate rejection.
    pub fn is_valid(code: String) -> bool {
        let bytes = code.as_bytes();
        let n = bytes.len();
        let mut stack: Vec<&[u8]> = Vec::new();
        let mut i = 0;
        while i < n {
            if bytes[i..].starts_with(b"<![CDATA[") {
                // Cdata is legal only inside tag content, and its body runs
                // to the first "]]>" — everything between is opaque text.
                if stack.is_empty() {
                    return false;
                }
                match find(bytes, i, b"]]>") {
                    Some(end) => i = end + 3,
                    None => return false,
                }
            } else if bytes[i..].starts_with(b"</") {
                // An end tag's name runs to the next ">"; it must equal the
                // most recently opened tag, or the nesting is unbalanced.
                if stack.is_empty() {
                    return false;
                }
                let j = match find(bytes, i, b">") {
                    Some(j) => j,
                    None => return false,
                };
                if stack.pop() != Some(&bytes[i + 2..j]) {
                    return false;
                }
                if stack.is_empty() && j != n - 1 {
                    return false; // the outer tag closed, yet content remains
                }
                i = j + 1;
            } else if bytes[i] == b'<' {
                // A start tag: parse the name to the next ">" and gate it
                // through the strict grammar before it enters the stack.
                let j = match find(bytes, i, b">") {
                    Some(j) => j,
                    None => return false,
                };
                let name = &bytes[i + 1..j];
                if !Self::tag_name(name) {
                    return false;
                }
                stack.push(name);
                i = j + 1;
            } else if stack.is_empty() {
                return false; // plain text outside any tag
            } else {
                i += 1;
            }
        }
        stack.is_empty()
    }

    // 1-9 characters, upper-case letters only.
    fn tag_name(name: &[u8]) -> bool {
        (1..=9).contains(&name.len()) && name.iter().all(|&b| b.is_ascii_uppercase())
    }
}

// Absolute index of the first occurrence of needle at or after from, if any.
fn find(haystack: &[u8], from: usize, needle: &[u8]) -> Option<usize> {
    if haystack.len() < needle.len() {
        return None;
    }
    (from..=haystack.len() - needle.len()).find(|&start| &haystack[start..start + needle.len()] == needle)
}
