impl Solution {
    pub fn process_str(s: String) -> String {
        // The specials mutate the result built so far: letters append,
        // '*' drops the tail, '#' doubles, '%' reverses. With s capped at
        // 20 chars the result never exceeds 2^19 characters, so a plain
        // byte vector is cheap and obviously correct.
        let mut result: Vec<u8> = Vec::new();
        for ch in s.bytes() {
            if ch.is_ascii_lowercase() {
                result.push(ch);
            } else if ch == b'*' {
                // pop on an empty vector is a harmless no-op.
                result.pop();
            } else if ch == b'#' {
                let doubled = result.clone();
                result.extend_from_slice(&doubled);
            } else {
                // '%'
                result.reverse();
            }
        }
        // The result only ever holds lowercase ASCII, so this cannot fail.
        String::from_utf8(result).unwrap()
    }
}
