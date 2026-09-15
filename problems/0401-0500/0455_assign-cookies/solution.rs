impl Solution {
    pub fn find_content_children(g: Vec<i32>, s: Vec<i32>) -> i32 {
        // Both sorted ascending, the least greedy unfed child faces the
        // smallest unassigned cookie: the cheapest pairing worth trying.
        let mut g = g;
        let mut s = s;
        g.sort();
        s.sort();
        let mut child = 0;
        for &cookie in &s {
            // A cookie too small for the least greedy remaining child is too
            // small for everyone remaining — skip it. Otherwise feed it.
            if child < g.len() && cookie >= g[child] {
                child += 1;
            }
        }
        child as i32
    }
}
