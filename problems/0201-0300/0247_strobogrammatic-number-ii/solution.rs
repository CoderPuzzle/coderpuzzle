impl Solution {
    pub fn find_strobogrammatic(n: i32) -> Vec<String> {
        // A strobogrammatic number of length n is one wrapping pair around
        // one of length n - 2, so the recursion shrinks by 2 per level —
        // down to an empty core (even n) or one self-rotating digit (odd n).
        Self::build(n, true)
    }

    fn build(length: i32, outer: bool) -> Vec<String> {
        if length == 0 {
            return vec![String::new()];
        }
        if length == 1 {
            return vec!["0".to_string(), "1".to_string(), "8".to_string()];
        }
        // "00" would put a leading zero on the whole number, so it may
        // wrap only inner layers, never the outermost.
        let pairs: &[&str] = if outer {
            &["11", "69", "88", "96"]
        } else {
            &["00", "11", "69", "88", "96"]
        };
        let inners = Self::build(length - 2, false);
        let mut results = Vec::with_capacity(pairs.len() * inners.len());
        // Pairs ascend by their left digit and every wrapped result has the
        // same length, so each layer emits its list in ascending
        // lexicographic order already — no final sort needed.
        for pair in pairs {
            for inner in &inners {
                results.push(format!("{}{}{}", &pair[..1], inner, &pair[1..]));
            }
        }
        results
    }
}
