impl Solution {
    // A word already contained in another never extends a superstring,
    // so it is dropped (duplicates collapse with it).
    pub fn minimum_string(a: String, b: String, c: String) -> String {
        let raw = vec![a, b, c];
        let mut unique: Vec<String> = Vec::new();
        for w in raw {
            if !unique.contains(&w) {
                unique.push(w);
            }
        }
        let words: Vec<&String> = unique
            .iter()
            .filter(|w| !unique.iter().any(|t| t != *w && t.contains(w.as_str())))
            .collect();
        if words.len() == 1 {
            return words[0].clone();
        }

        let mut best = String::new();
        for i in 0..words.len() {
            for j in 0..words.len() {
                if j == i {
                    continue;
                }
                // Chain the words in the order i -> j -> (the remaining one);
                // every optimal superstring lines up its words in some such
                // order with each pair joined on their full overlap.
                let mut cur = Solution::merge(words[i].as_str(), words[j].as_str());
                for k in 0..words.len() {
                    if k != i && k != j {
                        cur = Solution::merge(&cur, words[k].as_str());
                    }
                }
                if best.is_empty() || cur.len() < best.len() || (cur.len() == best.len() && cur < best) {
                    best = cur;
                }
            }
        }
        best
    }

    // Largest k whose x-suffix equals y's prefix; k = 0 (plain
    // concatenation) always works as the fallback.
    fn merge(x: &str, y: &str) -> String {
        let xb = x.as_bytes();
        let yb = y.as_bytes();
        let limit = xb.len().min(yb.len());
        for k in (1..=limit).rev() {
            if &xb[xb.len() - k..] == &yb[..k] {
                let mut out = String::with_capacity(xb.len() + yb.len() - k);
                out.push_str(x);
                out.push_str(&y[k..]);
                return out;
            }
        }
        let mut out = String::with_capacity(xb.len() + yb.len());
        out.push_str(x);
        out.push_str(y);
        out
    }
}
