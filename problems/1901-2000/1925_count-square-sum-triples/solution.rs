impl Solution {
    pub fn count_triples(n: i32) -> i32 {
        // Each ordered pair (a, b) contributes one triple iff a^2 + b^2 is a
        // perfect square c^2 with c <= n. Rounding sqrt and re-squaring keeps
        // the check on the integer side, immune to float drift.
        let mut count = 0;
        for a in 1..=n {
            for b in 1..=n {
                let s = a * a + b * b;
                let r = (s as f64).sqrt().round() as i32;
                if r <= n && r * r == s {
                    count += 1;
                }
            }
        }
        count
    }
}
