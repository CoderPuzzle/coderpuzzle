impl Solution {
    pub fn trim_trailing_vowels(mut s: String) -> String {
        let bytes = s.as_bytes();
        let mut end = bytes.len();
        while end > 0 && matches!(bytes[end - 1], b'a' | b'e' | b'i' | b'o' | b'u') {
            end -= 1;
        }
        s.truncate(end);
        s
    }
}
