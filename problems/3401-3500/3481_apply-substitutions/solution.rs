use std::collections::HashMap;

impl Solution {
    pub fn apply_substitutions(replacements: Vec<Vec<String>>, text: String) -> String {
        // The replacements form a DAG on keys: expand(key) renders its raw
        // value, recursing into each %X% reference exactly once via the memo.
        let mut raw: HashMap<String, String> = HashMap::new();
        for pair in &replacements {
            raw.insert(pair[0].clone(), pair[1].clone());
        }
        let mut done: HashMap<String, String> = HashMap::new();
        Self::render(&text, &raw, &mut done)
    }

    fn render(s: &str, raw: &HashMap<String, String>, done: &mut HashMap<String, String>) -> String {
        let mut out = String::new();
        let mut rest = s;
        while let Some(pos) = rest.find('%') {
            out.push_str(&rest[..pos]);
            // %K% placeholders are three characters wide (single-letter keys)
            let key = rest[pos + 1..pos + 2].to_string();
            out.push_str(&Self::expand(&key, raw, done));
            rest = &rest[pos + 3..];
        }
        out.push_str(rest);
        out
    }

    fn expand(key: &str, raw: &HashMap<String, String>, done: &mut HashMap<String, String>) -> String {
        if let Some(finished) = done.get(key) {
            return finished.clone();
        }
        let out = Self::render(&raw[key], raw, done);
        done.insert(key.to_string(), out.clone());
        out
    }
}
