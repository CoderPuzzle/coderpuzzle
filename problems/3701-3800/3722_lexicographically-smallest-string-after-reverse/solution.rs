impl Solution {
    pub fn lex_smallest(s: String) -> String {
        // Reversing a single character changes nothing, so s itself is
        // always one of the reachable strings and seeds the minimum.
        let letters: Vec<char> = s.chars().collect();
        let n = letters.len();
        let mut best = s.clone();
        // Flip the first k characters: the reversed head lands in front of
        // whatever the operation left untouched.
        for k in 2..=n {
            let mut candidate = letters.clone();
            candidate[..k].reverse();
            let text: String = candidate.into_iter().collect();
            if text < best {
                best = text;
            }
        }
        // Flip the last k characters: the untouched head keeps its order
        // while the reversed tail closes the string.
        for k in 2..=n {
            let head = n - k;
            let mut candidate = letters.clone();
            candidate[head..].reverse();
            let text: String = candidate.into_iter().collect();
            if text < best {
                best = text;
            }
        }
        best
    }
}
