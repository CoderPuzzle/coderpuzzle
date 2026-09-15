impl Solution {
    pub fn encode(s: String) -> String {
        let s = s.as_bytes();
        let n = s.len();
        let sub = |i: usize, j: usize| -> String { String::from_utf8(s[i..=j].to_vec()).unwrap() };
        let mut dp: Vec<Vec<String>> = vec![vec![String::new(); n]; n];
        // dp[i][j] = shortest encoding of s[i..j]; growing interval lengths
        // guarantee every subinterval is solved before it is needed.
        for length in 1..=n {
            for i in 0..=(n - length) {
                let j = i + length - 1;
                let substr = sub(i, j);
                // Candidate 1: keep the substring verbatim.
                let mut best = substr.clone();
                // Candidate 2: split in two, concatenate optimal encodings.
                for k in i..j {
                    let candidate = format!("{}{}", dp[i][k], dp[k + 1][j]);
                    if candidate.len() < best.len() {
                        best = candidate;
                    }
                }
                let mut compression: Option<String> = None;
                // Candidate 3: k[pattern] when a period divides the
                // interval. Embedding the pattern's own encoding (not raw
                // text) gives nested forms like 4[2[a]] for free.
                for p in 1..length {
                    if length % p == 0 {
                        let pattern = sub(i, i + p - 1);
                        if pattern.repeat(length / p) == substr {
                            let encoded = format!("{}[{}]", length / p, dp[i][i + p - 1]);
                            if compression.is_none() || encoded.len() < compression.as_ref().unwrap().len() {
                                compression = Some(encoded);
                            }
                        }
                    }
                }
                // Encode only if strictly shorter — or tied against an
                // already-encoded best; a tie with the raw text keeps the
                // text ("aaa" stays "aaa", "aaaaa" becomes "5[a]").
                if let Some(comp) = compression {
                    if comp.len() < best.len() || (comp.len() == best.len() && best != substr) {
                        best = comp;
                    }
                }
                dp[i][j] = best;
            }
        }
        dp[0][n - 1].clone()
    }
}
