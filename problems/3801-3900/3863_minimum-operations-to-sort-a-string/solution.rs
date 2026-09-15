impl Solution {
    pub fn min_operations(s: String) -> i32 {
        // A proper substring cannot sort a length-two string, so a
        // descending pair is impossible; otherwise the answer is decided
        // by where the smallest and largest characters appear.
        let bytes = s.as_bytes();
        let n = bytes.len();
        if bytes.windows(2).all(|w| w[0] <= w[1]) {
            return 0;
        }
        if n == 2 {
            return -1;
        }
        let mn = *bytes.iter().min().unwrap();
        let mx = *bytes.iter().max().unwrap();
        if bytes[0] == mn || bytes[n - 1] == mx {
            return 1;
        }
        for &c in &bytes[1..n - 1] {
            if c == mn || c == mx {
                return 2;
            }
        }
        3
    }
}
