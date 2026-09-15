impl Solution {
    pub fn can_be_equal(s1: String, s2: String) -> bool {
        // A legal swap joins indices exactly 2 apart, so it exchanges only
        // the slots {0, 2} or only the slots {1, 3}: no letter can ever
        // cross between the two pairs, and repeating a swap just undoes it.
        // Both strings are therefore stuck reshuffling inside their own two
        // pairs, and they can be made equal exactly when each pair already
        // carries the same two letters in either order — compare unordered.
        let a = s1.as_bytes();
        let b = s2.as_bytes();
        for k in [0usize, 1] {
            let mut p = [a[k], a[k + 2]];
            let mut q = [b[k], b[k + 2]];
            p.sort();
            q.sort();
            if p != q {
                return false;
            }
        }
        true
    }
}
