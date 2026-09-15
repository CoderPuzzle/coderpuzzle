use std::collections::{BTreeSet, HashMap};

impl Solution {
    pub fn palindrome_pairs(words: Vec<String>) -> Vec<Vec<i32>> {
        // word -> index: partners are found by hash lookup, not pair scanning.
        let mut index: HashMap<String, i32> = HashMap::new();
        for (i, w) in words.iter().enumerate() {
            index.insert(w.clone(), i as i32);
        }
        let mut results: BTreeSet<(i32, i32)> = BTreeSet::new();

        let is_palindrome = |s: &str| -> bool {
            let b = s.as_bytes();
            let (mut a, mut z) = (0usize, b.len());
            while a + 1 < z {
                if b[a] != b[z - 1] {
                    return false;
                }
                a += 1;
                z -= 1;
            }
            true
        };

        for (j, w) in words.iter().enumerate() {
            let bytes = w.as_bytes();
            let length = bytes.len();
            // For a concatenation to be a palindrome, one half of w must
            // already be one and the mirror of the other half must exist.
            for cut in 0..=length {
                let prefix = &w[..cut];
                let suffix = &w[cut..];
                // Palindromic prefix: reverse(suffix) can stand on the left.
                // The != j check stops a word from pairing with itself.
                if is_palindrome(prefix) {
                    let rev: String = suffix.chars().rev().collect();
                    if let Some(&i) = index.get(&rev) {
                        if i != j as i32 {
                            results.insert((i, j as i32));
                        }
                    }
                }
                // Palindromic suffix: reverse(prefix) goes on the right.
                // cut != length avoids re-emitting the full-string case,
                // which the partner word already finds at its cut 0.
                if cut != length && is_palindrome(suffix) {
                    let rev: String = prefix.chars().rev().collect();
                    if let Some(&i) = index.get(&rev) {
                        if i != j as i32 {
                            results.insert((j as i32, i));
                        }
                    }
                }
            }
        }

        results.into_iter().map(|(a, b)| vec![a, b]).collect()
    }
}
