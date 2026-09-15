impl Solution {
    pub fn longest_common_prefix(s: String, t: String) -> i32 {
        let s = s.as_bytes();
        let t = t.as_bytes();
        let (n, m) = (s.len(), t.len());
        // Walk to the first mismatch (or whichever string ends first).
        let mut i = 0;
        while i < n && i < m && s[i] == t[i] {
            i += 1;
        }
        // Removing s[i] is the only deletion worth trying: an earlier one
        // shifts the alignment for no gain, a later one cannot repair the
        // mismatch at i.
        let (mut j, mut k) = (i + 1, i);
        while j < n && k < m && s[j] == t[k] {
            j += 1;
            k += 1;
        }
        k as i32
    }
}
