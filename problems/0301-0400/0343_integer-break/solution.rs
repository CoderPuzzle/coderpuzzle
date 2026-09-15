impl Solution {
    pub fn integer_break(n: i32) -> i32 {
        // best[i]: the maximum product over all sums of two or more positive
        // integers totalling i. Build each i by choosing a first part j; the
        // remainder either stands whole as one part (the identity i - j, a
        // two-part sum) or breaks further (best[i - j], already two or more).
        let n = n as usize;
        let mut best = vec![0i32; n + 1];
        best[1] = 1;
        for i in 2..=n {
            for j in 1..i {
                // The inner max is the k >= 2 rule: i itself is never a legal
                // one-part product, only genuine splits enter the table.
                let remainder = best[i - j].max((i - j) as i32);
                best[i] = best[i].max(j as i32 * remainder);
            }
        }
        best[n]
    }
}
