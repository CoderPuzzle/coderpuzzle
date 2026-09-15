use std::collections::HashMap;

impl Solution {
    pub fn entity_parser(text: String) -> String {
        let entities: HashMap<&str, &str> = [
            ("&quot;", "\""),
            ("&apos;", "'"),
            ("&amp;", "&"),
            ("&gt;", ">"),
            ("&lt;", "<"),
            ("&frasl;", "/"),
        ]
        .iter()
        .cloned()
        .collect();
        let bytes = text.as_bytes();
        let mut result = String::with_capacity(text.len());
        let mut i = 0;
        let n = bytes.len();
        while i < n {
            if bytes[i] == b'&' {
                let mut matched = false;
                for (entity, symbol) in &entities {
                    if text[i..].starts_with(entity) {
                        result.push_str(symbol);
                        i += entity.len();
                        matched = true;
                        break;
                    }
                }
                if !matched {
                    result.push(bytes[i] as char);
                    i += 1;
                }
            } else {
                result.push(bytes[i] as char);
                i += 1;
            }
        }
        result
    }
}
