impl Solution {
    pub fn is_decomposable(s: String) -> bool {
        // A run is a maximal block of equal digits. A run of length L must
        // split into 3-length pieces plus at most one 2-length piece, so
        // L % 3 is 0 (no 2) or 2 (one 2); L % 3 == 1 can never be split.
        let b = s.as_bytes();
        let mut twos = 0;
        let mut i = 0;
        while i < b.len() {
            let mut j = i;
            while j < b.len() && b[j] == b[i] {
                j += 1;
            }
            let length = j - i;
            if length % 3 == 1 {
                return false;
            }
            if length % 3 == 2 {
                twos += 1;
                if twos > 1 {
                    return false;
                }
            }
            i = j;
        }
        twos == 1
    }
}
