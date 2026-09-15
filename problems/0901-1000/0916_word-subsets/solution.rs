impl Solution {
    pub fn word_subsets(words1: Vec<String>, words2: Vec<String>) -> Vec<String> {
        // Collapse words2 to a single requirement vector: per letter, the
        // max count any one b demands. Covering the max covers every b,
        // because each b is checked independently by the definition.
        let mut need = [0i32; 26];
        for b in &words2 {
            for (i, n) in Self::counts(b).into_iter().enumerate() {
                need[i] = need[i].max(n);
            }
        }

        // A word is universal iff its counts dominate the collapsed demand
        // everywhere; survivors keep their input order.
        words1
            .into_iter()
            .filter(|a| Self::counts(a).into_iter().zip(need).all(|(x, y)| x >= y))
            .collect()
    }

    // One slot per letter: "aba" -> [2, 1, 0, ...].
    fn counts(s: &str) -> [i32; 26] {
        let mut c = [0i32; 26];
        for b in s.bytes() {
            c[(b - b'a') as usize] += 1;
        }
        c
    }
}
