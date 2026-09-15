impl Solution {
    pub fn check_partitioning(s: String) -> bool {
        let s = s.as_bytes();
        let n = s.len();
        // is_pal[l][r] marks s[l..r] as a palindrome; entries are filled
        // by increasing length so each one depends on a shorter interval.
        let mut is_pal = vec![vec![false; n]; n];
        for i in 0..n {
            is_pal[i][i] = true;
        }
        for i in 0..n.saturating_sub(1) {
            if s[i] == s[i + 1] {
                is_pal[i][i + 1] = true;
            }
        }
        for length in 3..=n {
            for l in 0..=n - length {
                let r = l + length - 1;
                if s[l] == s[r] && is_pal[l + 1][r - 1] {
                    is_pal[l][r] = true;
                }
            }
        }
        // Three non-empty parts are fixed by two cuts i and j; every cut
        // pair is tried against the table.
        for i in 1..n - 1 {
            if !is_pal[0][i - 1] {
                continue;
            }
            for j in i + 1..n {
                if is_pal[i][j - 1] && is_pal[j][n - 1] {
                    return true;
                }
            }
        }
        false
    }
}
