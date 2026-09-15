use std::collections::HashMap;

impl Solution {
    pub fn odd_string(words: Vec<String>) -> String {
        // Encode each word as its difference signature (the n-1 consecutive
        // letter differences); the odd word is the one whose signature
        // appears exactly once.
        let mut count: HashMap<String, usize> = HashMap::new();
        let mut sigs: Vec<String> = Vec::with_capacity(words.len());
        for w in &words {
            let b = w.as_bytes();
            let sig = (1..b.len())
                .map(|i| format!("{},", b[i] as i32 - b[i - 1] as i32))
                .collect::<String>();
            *count.entry(sig.clone()).or_insert(0) += 1;
            sigs.push(sig);
        }
        for (w, s) in words.iter().zip(sigs.iter()) {
            if count[s] == 1 {
                return w.clone();
            }
        }
        String::new()
    }
}
