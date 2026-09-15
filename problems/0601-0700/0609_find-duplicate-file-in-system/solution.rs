use std::collections::HashMap;

impl Solution {
    // One scan groups every file by what it contains. Inside a directory
    // info string the directory path comes first, then its files; a file
    // token keeps its name before the first '(' and its content between
    // that '(' and the token's last ')'. Contents hold no space — the
    // space-separated tokenization could not carry one — so every file
    // lands in exactly one bucket, its path appended in scan order.
    pub fn find_duplicate(paths: Vec<String>) -> Vec<Vec<String>> {
        let mut groups: HashMap<String, Vec<String>> = HashMap::new();
        for info in &paths {
            let mut tokens = info.split(' ');
            let directory = tokens.next().unwrap_or("");
            for token in tokens {
                let open = token.find('(').expect("token opens a content");
                let close = token.rfind(')').expect("token closes its content");
                let name = &token[..open];
                let content = &token[open + 1..close];
                groups
                    .entry(content.to_string())
                    .or_default()
                    .push(format!("{}/{}", directory, name));
            }
        }
        let mut contents: Vec<String> = groups.keys().cloned().collect();
        // A bucket answers the question only once a second file joins it;
        // the pinned order lists the survivors by content, descending.
        contents.sort();
        contents.reverse();
        let mut results: Vec<Vec<String>> = Vec::new();
        for content in &contents {
            let group = &groups[content];
            if group.len() >= 2 {
                results.push(group.clone());
            }
        }
        results
    }
}
