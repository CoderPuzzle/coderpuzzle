impl Solution {
    // A length-3 window is good iff its three characters are pairwise
    // distinct; slide the center and count.
    pub fn count_good_substrings(s: String) -> i32 {
        let b = s.as_bytes();
        let n = b.len();
        let mut count = 0;
        for i in 1..n.saturating_sub(1) {
            if b[i - 1] != b[i] && b[i] != b[i + 1] && b[i - 1] != b[i + 1] {
                count += 1;
            }
        }
        count
    }
}
