impl Solution {
    pub fn str_str(haystack: String, needle: String) -> i32 {
        // The empty needle occurs at every index by convention; the first is 0.
        if needle.is_empty() {
            return 0;
        }
        let (haystack, needle) = (haystack.as_bytes(), needle.as_bytes());
        let m = needle.len();
        // lps[i]: length of the longest proper prefix of needle[..i + 1] that
        // is also a suffix of it — how much of a partial match survives a
        // mismatch at the next character.
        let mut lps = vec![0usize; m];
        let mut k = 0usize;
        for i in 1..m {
            while k > 0 && needle[i] != needle[k] {
                k = lps[k - 1];
            }
            if needle[i] == needle[k] {
                k += 1;
            }
            lps[i] = k;
        }
        // Scan haystack once; k counts the needle characters currently matched
        // ending at haystack[i]. On mismatch k falls back to the longest needle
        // prefix that is still a suffix of the matched window, not to zero.
        let mut k = 0usize;
        for (i, &ch) in haystack.iter().enumerate() {
            while k > 0 && ch != needle[k] {
                k = lps[k - 1];
            }
            if ch == needle[k] {
                k += 1;
            }
            if k == m {
                return (i + 1 - m) as i32;
            }
        }
        -1
    }
}
