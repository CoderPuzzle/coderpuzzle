// Decrementing a letter helps only when it is not 'a', so the win starts
// at the first non-'a' letter: shrink that entire run of non-'a' letters
// and stop at the next 'a' or the end (turning an 'a' into 'z' would only
// hurt). An all-'a' string has no helpful edit at all, so the mandatory
// operation wraps just the last letter to 'z'.
impl Solution {
    pub fn smallest_string(s: String) -> String {
        let mut chars: Vec<u8> = s.into_bytes();
        let n = chars.len();
        let mut i = 0;
        while i < n && chars[i] == b'a' {
            i += 1;
        }
        if i == n {
            chars[n - 1] = b'z';
            return String::from_utf8(chars).unwrap();
        }
        while i < n && chars[i] != b'a' {
            chars[i] -= 1;
            i += 1;
        }
        String::from_utf8(chars).unwrap()
    }
}
