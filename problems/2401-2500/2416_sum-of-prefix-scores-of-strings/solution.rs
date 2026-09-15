use std::collections::HashMap;

impl Solution {
    pub fn sum_prefix_scores(words: Vec<String>) -> Vec<i32> {
        // Flat trie: node 0 is the root.
        let mut children: Vec<HashMap<u8, usize>> = vec![HashMap::new()];
        let mut cnt: Vec<i32> = vec![0];
        for word in &words {
            let mut node = 0usize;
            for &b in word.as_bytes() {
                let next = children[node].get(&b).copied();
                let id = match next {
                    Some(id) => id,
                    None => {
                        children.push(HashMap::new());
                        cnt.push(0);
                        let id = children.len() - 1;
                        children[node].insert(b, id);
                        id
                    }
                };
                node = id;
                // count at every depth: the word itself scores its own prefixes
                cnt[node] += 1;
            }
        }
        // second pass: a word's answer is the sum of cnt along its trie path
        let mut scores = Vec::with_capacity(words.len());
        for word in &words {
            let mut node = 0usize;
            let mut total = 0i32;
            for &b in word.as_bytes() {
                node = *children[node].get(&b).unwrap();
                // cnt of the reached node is the score of the prefix so far
                total += cnt[node];
            }
            scores.push(total);
        }
        scores
    }
}
