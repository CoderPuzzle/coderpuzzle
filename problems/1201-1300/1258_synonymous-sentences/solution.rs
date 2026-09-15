use std::collections::HashMap;

impl Solution {
    pub fn generate_sentences(synonyms: Vec<Vec<String>>, text: String) -> Vec<String> {
        // Union-find over every word mentioned in a pair.
        let mut parent: HashMap<String, String> = HashMap::new();

        fn find(parent: &mut HashMap<String, String>, x: &str) -> String {
            parent.entry(x.to_string()).or_insert_with(|| x.to_string());
            let mut root = x.to_string();
            while parent[&root] != root {
                root = parent[&root].clone();
            }
            // Compress the walked path onto the root.
            let mut cur = x.to_string();
            while cur != root {
                let next = parent[&cur].clone();
                parent.insert(cur.clone(), root.clone());
                cur = next;
            }
            root
        }

        for pair in &synonyms {
            let a = find(&mut parent, &pair[0]);
            let b = find(&mut parent, &pair[1]);
            parent.insert(a, b);
        }

        let mut groups: HashMap<String, Vec<String>> = HashMap::new();
        for word in parent.keys().cloned().collect::<Vec<_>>() {
            let root = find(&mut parent, &word);
            groups.entry(root).or_default().push(word);
        }
        for group in groups.values_mut() {
            group.sort();
        }

        // Expand position by position.
        let mut sentences: Vec<String> = vec![String::new()];
        for word in text.split(' ') {
            let members: Vec<String> = match parent.get(word) {
                Some(_) => groups[&find(&mut parent, word)].clone(),
                None => vec![word.to_string()],
            };
            let mut next = Vec::with_capacity(sentences.len() * members.len());
            for prefix in &sentences {
                for option in &members {
                    next.push(format!("{} {}", prefix, option));
                }
            }
            sentences = next;
        }
        let mut result: Vec<String> = sentences.into_iter().map(|s| s[1..].to_string()).collect();
        result.sort();
        result
    }
}
