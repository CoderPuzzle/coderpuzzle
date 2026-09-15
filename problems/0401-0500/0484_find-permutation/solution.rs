impl Solution {
    // Ascending 1..n+1 is the lexicographically smallest arrangement of the
    // values, and it already satisfies every 'I' — so disturb it only where
    // a maximal run of 'D's demands a descent, by reversing exactly the
    // block that run covers.
    pub fn find_permutation(s: String) -> Vec<i32> {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let mut perm: Vec<i32> = (1..=(n as i32 + 1)).collect();
        let mut i = 0;
        while i < n {
            if bytes[i] == b'D' {
                let start = i;
                while i < n && bytes[i] == b'D' {
                    i += 1;
                }
                perm[start..=i].reverse();
            } else {
                i += 1;
            }
        }
        perm
    }
}
