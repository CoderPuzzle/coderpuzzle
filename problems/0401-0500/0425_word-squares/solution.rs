use std::collections::HashMap;

impl Solution {
    pub fn word_squares(words: Vec<String>) -> Vec<Vec<String>> {
        let n = words[0].len();
        // Map every prefix of every word (empty prefix included) to the words
        // sharing it, so each search step is a single lookup.
        let mut prefix_map: HashMap<String, Vec<String>> = HashMap::new();
        for w in &words {
            for i in 0..=n {
                prefix_map
                    .entry(w[..i].to_string())
                    .or_insert_with(Vec::new)
                    .push(w.clone());
            }
        }

        let mut results: Vec<Vec<String>> = Vec::new();
        let mut square: Vec<String> = Vec::new();
        backtrack(&prefix_map, &mut square, n, &mut results);
        // Sorting only makes the output order deterministic.
        results.sort_by(|a, b| {
            for i in 0..a.len() {
                match a[i].cmp(&b[i]) {
                    std::cmp::Ordering::Equal => continue,
                    other => return other,
                }
            }
            std::cmp::Ordering::Equal
        });
        results
    }
}

fn backtrack(
    prefix_map: &HashMap<String, Vec<String>>,
    square: &mut Vec<String>,
    n: usize,
    results: &mut Vec<Vec<String>>,
) {
    if square.len() == n {
        results.push(square.clone());
        return;
    }
    let col = square.len();
    // Row `col` must start with the column-`col` chars already placed, so
    // the next word is constrained to one forced prefix.
    let mut prefix = String::new();
    for row in square.iter() {
        prefix.push(row.as_bytes()[col] as char);
    }
    // A matching word fixes square[j][col] == square[col][j] for every
    // earlier row j at once; a missing bucket prunes the branch here.
    if let Some(candidates) = prefix_map.get(&prefix) {
        for w in candidates {
            square.push(w.clone());
            backtrack(prefix_map, square, n, results);
            square.pop();
        }
    }
}
