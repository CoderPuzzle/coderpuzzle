impl Solution {
    // Walk both strings with two pointers, skipping the X's. The i-th letter
    // of start must be the i-th letter of result — L's and R's never cross
    // and never change kind — and each must move legally: an L only ever
    // moves left onto an X, an R only right onto an X.
    pub fn can_transform(start: String, result: String) -> bool {
        let a = start.as_bytes();
        let b = result.as_bytes();
        let (mut i, mut j) = (0, 0);
        let (n, m) = (a.len(), b.len());
        loop {
            while i < n && a[i] == b'X' {
                i += 1;
            }
            while j < m && b[j] == b'X' {
                j += 1;
            }
            if i == n || j == m {
                return i == n && j == m;
            }
            if a[i] != b[j] {
                return false;
            }
            if a[i] == b'L' && j > i {
                return false; // this L would have to move right
            }
            if a[i] == b'R' && j < i {
                return false; // this R would have to move left
            }
            i += 1;
            j += 1;
        }
    }
}
