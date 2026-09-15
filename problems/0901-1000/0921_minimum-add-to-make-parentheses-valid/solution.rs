impl Solution {
    pub fn min_add_to_make_valid(s: String) -> i32 {
        // A move only inserts, so the answer is how many parentheses are
        // missing. One sweep keeps the count of '(' that no ')' has claimed:
        // a ')' consumes one when available, otherwise it is stranded —
        // nothing later in s can pair with it — and costs an inserted '('.
        // Unclaimed '(' at the end cost an inserted ')' each; both debts
        // are forced and sufficient.
        let mut insertions = 0i32;
        let mut opened = 0i32;
        for &c in s.as_bytes() {
            if c == b'(' {
                opened += 1;
            } else if opened > 0 {
                opened -= 1;
            } else {
                insertions += 1;
            }
        }
        insertions + opened
    }
}
