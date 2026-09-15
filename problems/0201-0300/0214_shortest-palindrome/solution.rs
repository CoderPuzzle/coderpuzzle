impl Solution {
    pub fn shortest_palindrome(s: String) -> String {
        let rev: String = s.chars().rev().collect();
        // A prefix of s is a palindrome exactly when it equals a suffix of
        // rev, so the KMP prefix function over s + "#" + rev finds it. The
        // separator byte (absent from s) keeps the border from stretching
        // across the join and exceeding s.len().
        let mut combined: Vec<u8> = s.as_bytes().to_vec();
        combined.push(b'#');
        combined.extend_from_slice(rev.as_bytes());
        let n = combined.len();
        let mut lps = vec![0usize; n];
        for i in 1..n {
            // j is the border length of the previous position: shrink through
            // lps[j-1] on mismatch, extend by one on match — linear overall.
            let mut j = lps[i - 1];
            while j > 0 && combined[i] != combined[j] {
                j = lps[j - 1];
            }
            if combined[i] == combined[j] {
                j += 1;
            }
            lps[i] = j;
        }
        // The last entry is the longest proper border: the palindromic
        // prefix length.
        let pal_len = if n > 0 { lps[n - 1] } else { 0 };
        // Mirror only the non-palindromic tail onto the front.
        format!("{}{}", &rev[..s.len() - pal_len], s)
    }
}
