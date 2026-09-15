impl Solution {
    // A long press only stretches a character into a run of copies of
    // itself. Walk both strings with two pointers: a typed character equal
    // to the next wanted one consumes it, a typed character equal to its
    // predecessor is a repeat of one already consumed, and anything else
    // cannot occur. Name must be fully consumed at the end.
    pub fn is_long_pressed_name(name: String, typed: String) -> bool {
        let a = name.as_bytes();
        let b = typed.as_bytes();
        let (mut i, mut j) = (0, 0);
        let (n, m) = (a.len(), b.len());
        while j < m {
            if i < n && a[i] == b[j] {
                i += 1;
                j += 1;
            } else if j > 0 && b[j] == b[j - 1] {
                j += 1; // a long press of the previous character
            } else {
                return false;
            }
        }
        i == n
    }
}
