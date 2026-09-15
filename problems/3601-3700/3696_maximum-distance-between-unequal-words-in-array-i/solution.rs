impl Solution {
    pub fn max_distance(words: Vec<String>) -> i32 {
        // Starting best at 0 bakes in the sentinel: only a genuinely
        // unequal pair can raise it, so an all-equal array (or a single
        // word, which has no pairs at all) returns 0 untouched.
        let n = words.len();
        let mut best = 0i32;
        // Check every index pair once; each unequal pair contributes
        // j - i + 1, counting both endpoints.
        for i in 0..n {
            for j in (i + 1)..n {
                if words[i] != words[j] {
                    best = best.max((j - i) as i32 + 1);
                }
            }
        }
        best
    }
}
