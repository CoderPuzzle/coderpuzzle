impl Solution {
    pub fn longest_prefix(s: String) -> String {
        let b = s.as_bytes();
        let n = b.len();
        // KMP prefix function: pi[i] = length of the longest proper prefix
        // of s[0..i] that is also its suffix; j is the current match length
        let mut pi = vec![0usize; n];
        let mut j = 0usize;
        for i in 1..n {
            // mismatch: fall back to the border of the matched block — the
            // next-longest candidate; j rises <= 1 per step, so the pass is O(n)
            while j > 0 && b[i] != b[j] {
                j = pi[j - 1];
            }
            if b[i] == b[j] {
                j += 1;
            }
            pi[i] = j;
        }
        if n == 0 {
            String::new()
        } else {
            // pi[n-1] is a proper border, so it never equals the whole string
            s[..pi[n - 1]].to_string()
        }
    }
}
