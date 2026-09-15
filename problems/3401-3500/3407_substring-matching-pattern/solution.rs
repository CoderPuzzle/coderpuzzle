impl Solution {
    // Split at the star: the fixed prefix must occur somewhere and the
    // fixed suffix somewhere after it; the star absorbs whatever sits
    // between the two.
    pub fn has_match(s: String, p: String) -> bool {
        let star = p.find('*').unwrap();
        let (pre, suf) = (&p[..star], &p[star + 1..]);
        let first = s.find(pre);
        let last = s.rfind(suf);
        match (first, last) {
            (Some(a), Some(b)) => a + pre.len() <= b,
            _ => false,
        }
    }
}
