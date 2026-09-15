use std::collections::HashMap;

impl Solution {
    pub fn count_word_occurrences(chunks: Vec<String>, queries: Vec<String>) -> Vec<i32> {
        let text: String = chunks.concat();
        let chars: Vec<char> = text.chars().collect();
        let mut counts: HashMap<String, i32> = HashMap::new();
        let mut current = String::new();

        let flush = |counts: &mut HashMap<String, i32>, current: &mut String| {
            if !current.is_empty() {
                *counts.entry(current.clone()).or_insert(0) += 1;
                current.clear();
            }
        };

        for i in 0..chars.len() {
            let c = chars[i];
            if c == '-' {
                let previous = i > 0 && chars[i - 1].is_ascii_lowercase();
                let next = i + 1 < chars.len() && chars[i + 1].is_ascii_lowercase();
                if previous && next {
                    current.push(c);
                } else {
                    flush(&mut counts, &mut current);
                }
            } else if c.is_ascii_lowercase() {
                current.push(c);
            } else {
                flush(&mut counts, &mut current);
            }
        }
        flush(&mut counts, &mut current);

        queries
            .iter()
            .map(|query| counts.get(query).copied().unwrap_or(0))
            .collect()
    }
}
