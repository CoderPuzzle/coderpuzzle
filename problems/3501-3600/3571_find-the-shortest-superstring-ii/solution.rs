impl Solution {
    // Containment first: the shorter answer is then always a merge that
    // overlaps a suffix of one string with a prefix of the other, so the
    // scan takes the largest such overlap in either direction and lets the
    // first direction win ties.
    pub fn shortest_superstring(s1: String, s2: String) -> String {
        fn max_overlap(a: &str, b: &str) -> usize {
            let top = a.len().min(b.len());
            for k in (1..=top).rev() {
                if a.as_bytes()[a.len() - k..] == b.as_bytes()[..k] {
                    return k;
                }
            }
            0
        }
        if s1.contains(&s2) {
            return s1;
        }
        if s2.contains(&s1) {
            return s2;
        }
        let ov1 = max_overlap(&s1, &s2); // suffix of s1 == prefix of s2
        let ov2 = max_overlap(&s2, &s1);
        if ov1 >= ov2 {
            format!("{}{}", s1, &s2[ov1..])
        } else {
            format!("{}{}", s2, &s1[ov2..])
        }
    }
}
