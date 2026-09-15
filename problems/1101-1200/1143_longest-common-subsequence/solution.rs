impl Solution {
    pub fn longest_common_subsequence(text1: String, text2: String) -> i32 {
        let a = text1.into_bytes();
        let b = text2.into_bytes();
        let (m, n) = (a.len(), b.len());
        // dp row for the empty prefix of text1 (all zeros); each new row only
        // reads the row above, so two rows suffice
        let mut prev = vec![0i32; n + 1];
        let mut curr = vec![0i32; n + 1];
        for i in 1..=m {
            let c = a[i - 1];
            for j in 1..=n {
                if c == b[j - 1] {
                    // aligning matching last chars is always safe: extend
                    // the LCS of both shorter prefixes
                    curr[j] = prev[j - 1] + 1;
                } else {
                    // an optimal LCS discards at least one of the two
                    // characters, so take the better of dropping either
                    curr[j] = prev[j].max(curr[j - 1]);
                }
            }
            // curr becomes the previous row for the next i
            std::mem::swap(&mut prev, &mut curr);
        }
        prev[n]
    }
}
