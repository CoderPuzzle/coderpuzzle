impl Solution {
    pub fn longest_str_chain(words: Vec<String>) -> i32 {
        // dedupe first (duplicates never extend each other), then process
        // shortest first: every one-deletion predecessor is already in dp
        // when its successor is reached
        let mut unique: Vec<String> = {
            let mut set = std::collections::HashSet::new();
            words.into_iter().filter(|w| set.insert(w.clone())).collect()
        };
        unique.sort_by_key(|w| w.len());
        let mut dp: std::collections::HashMap<String, i32> = std::collections::HashMap::new();
        let mut best = 0;
        for word in &unique {
            // dp[word] = longest chain ending at word: 1 + the best value
            // among its one-deletion variants present in dp (1 = alone)
            let mut current = 1;
            for i in 0..word.len() {
                let mut predecessor = String::with_capacity(word.len() - 1);
                predecessor.push_str(&word[..i]);
                predecessor.push_str(&word[i + 1..]);
                if let Some(&prev) = dp.get(&predecessor) {
                    if prev + 1 > current {
                        current = prev + 1;
                    }
                }
            }
            dp.insert(word.clone(), current);
            if current > best {
                best = current;
            }
        }
        best
    }
}
