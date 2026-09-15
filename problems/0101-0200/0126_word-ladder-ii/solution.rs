use std::collections::{HashMap, HashSet, VecDeque};

impl Solution {
    pub fn find_ladders(begin_word: String, end_word: String, word_list: Vec<String>) -> Vec<Vec<String>> {
        let mut word_set: HashSet<String> = word_list.into_iter().collect();
        if !word_set.contains(&end_word) {
            return Vec::new();
        }
        // Drop begin_word so the search can never route back through it.
        word_set.remove(&begin_word);

        // BFS over the implicit one-letter-difference graph: record each word's
        // shortest distance and a DAG of shortest-path edges.
        let mut dist: HashMap<String, usize> = HashMap::new();
        dist.insert(begin_word.clone(), 0);
        let mut adjacency: HashMap<String, Vec<String>> = HashMap::new();
        let mut queue: VecDeque<String> = VecDeque::new();
        queue.push_back(begin_word.clone());
        let letters: Vec<u8> = (b'a'..=b'z').collect();
        while let Some(word) = queue.pop_front() {
            let d = *dist.get(&word).unwrap();
            let chars: Vec<u8> = word.bytes().collect();
            for i in 0..chars.len() {
                // Try substituting each of the 25 other letters at position i.
                for &c in &letters {
                    if c == chars[i] {
                        continue;
                    }
                    let mut nc = chars.clone();
                    nc[i] = c;
                    let nxt = String::from_utf8(nc).unwrap();
                    if !word_set.contains(&nxt) {
                        continue;
                    }
                    if !dist.contains_key(&nxt) {
                        // First discovery: nxt is one level below word.
                        dist.insert(nxt.clone(), d + 1);
                        adjacency.entry(word.clone()).or_default().push(nxt.clone());
                        queue.push_back(nxt);
                    } else if dist.get(&nxt).copied() == Some(d + 1) {
                        // Already exactly one level below: parallel shortest edge.
                        adjacency.entry(word.clone()).or_default().push(nxt);
                    }
                    // Same-level or backward edges never lie on a shortest
                    // ladder, so they are simply not recorded.
                }
            }
        }

        let mut result: Vec<Vec<String>> = Vec::new();
        let mut path: Vec<String> = vec![begin_word.clone()];
        // DFS over the recorded DAG: every edge advances exactly one BFS level,
        // so any root-to-end_word walk is automatically a shortest ladder.
        Self::dfs(&begin_word, &end_word, &adjacency, &mut path, &mut result);
        result
    }

    fn dfs(
        word: &str,
        end_word: &str,
        adjacency: &HashMap<String, Vec<String>>,
        path: &mut Vec<String>,
        result: &mut Vec<Vec<String>>,
    ) {
        if word == end_word {
            result.push(path.clone());
            return;
        }
        if let Some(neighbors) = adjacency.get(word) {
            for nxt in neighbors {
                path.push(nxt.clone());
                Self::dfs(nxt, end_word, adjacency, path, result);
                path.pop();
            }
        }
    }
}
