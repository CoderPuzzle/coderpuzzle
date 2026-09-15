impl Solution {
    pub fn make_fancy_string(s: String) -> String {
        // Greedy append: keep s[i] unless it would extend a run of three.
        // Runs of a repeated character are independent, so truncating every
        // maximal run to two chars is both minimal (every extra char beyond
        // two in a run must be deleted) and the unique answer.
        let mut res: Vec<char> = Vec::with_capacity(s.len());
        for c in s.chars() {
            let n = res.len();
            if n >= 2 && res[n - 1] == c && res[n - 2] == c {
                continue;
            }
            res.push(c);
        }
        res.into_iter().collect()
    }
}
