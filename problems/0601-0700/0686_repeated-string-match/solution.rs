impl Solution {
    // q = ceil(m/n) is the least count whose text is even as long as b, and
    // no occurrence needs more than q + 1: a repeated forever has period n,
    // so any occurrence of b slides into the first q + 1 copies.
    pub fn repeated_string_match(a: String, b: String) -> i32 {
        let (n, m) = (a.len(), b.len());
        let q = (m + n - 1) / n;
        let repeated = a.repeat(q);
        if repeated.contains(b.as_str()) {
            return q as i32;
        }
        let longer = repeated + &a;
        if longer.contains(b.as_str()) {
            return (q + 1) as i32;
        }
        -1
    }
}
