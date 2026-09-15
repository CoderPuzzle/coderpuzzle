impl Solution {
    pub fn good_indices(s: String) -> Vec<i32> {
        // A matching substring must be exactly as long as i's decimal
        // representation, so every index has just one candidate: the
        // suffix of that length ending at i. Comparing that window
        // against the digits of i decides the index — representations
        // never carry a leading zero, so a window like "01" fails
        // plainly against the real digits of i.
        let b = s.as_bytes();
        let mut res: Vec<i32> = Vec::new();
        for i in 0..b.len() {
            let t = i.to_string();
            if t.len() > i + 1 {
                continue; // representation cannot fit before the index
            }
            let j = i + 1 - t.len();
            if &b[j..i + 1] == t.as_bytes() {
                res.push(i as i32);
            }
        }
        res
    }
}
