use std::collections::HashMap;

impl Solution {
    pub fn evaluate(s: String, knowledge: Vec<Vec<String>>) -> String {
        // One left-to-right pass: a '(' hands control to the matching ')',
        // the enclosed key goes through the map, everything else is copied
        // verbatim. Values are bracket-free, so nothing emitted is ever
        // re-examined.
        let known: HashMap<&str, &str> = knowledge
            .iter()
            .map(|pair| (pair[0].as_str(), pair[1].as_str()))
            .collect();
        let bytes = s.as_bytes();
        let mut out = String::with_capacity(s.len());
        let mut i = 0;
        while i < bytes.len() {
            if bytes[i] == b'(' {
                let j = i + 1 + s[i + 1..].find(')').unwrap();
                match known.get(&s[i + 1..j]) {
                    Some(value) => out.push_str(value),
                    None => out.push('?'),
                }
                i = j + 1;
            } else {
                let c = s[i..].chars().next().unwrap();
                out.push(c);
                i += c.len_utf8();
            }
        }
        out
    }
}
