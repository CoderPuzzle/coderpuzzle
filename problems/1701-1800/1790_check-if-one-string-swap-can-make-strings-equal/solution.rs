impl Solution {
    pub fn are_almost_equal(s1: String, s2: String) -> bool {
        // One swap repairs exactly two positions, and only when their
        // characters are crossed between the two strings.
        let (a, b) = (s1.as_bytes(), s2.as_bytes());
        let (mut i, mut j) = (usize::MAX, usize::MAX);
        for k in 0..a.len() {
            if a[k] != b[k] {
                if i == usize::MAX {
                    i = k;
                } else if j == usize::MAX {
                    j = k;
                } else {
                    return false;
                }
            }
        }
        if j == usize::MAX {
            return i == usize::MAX;
        }
        a[i] == b[j] && a[j] == b[i]
    }
}
