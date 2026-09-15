impl Solution {
    pub fn break_palindrome(palindrome: String) -> String {
        // One change in the first half decides lexicographic order; lower the
        // first non-'a' there to 'a'. All-'a' halves force the last spot to
        // 'b'; length 1 can never stop being a palindrome.
        let n = palindrome.len();
        if n == 1 {
            return String::new();
        }
        let mut bytes = palindrome.into_bytes();
        for i in 0..n / 2 {
            if bytes[i] != b'a' {
                bytes[i] = b'a';
                return String::from_utf8(bytes).unwrap();
            }
        }
        bytes[n - 1] = b'b';
        String::from_utf8(bytes).unwrap()
    }
}
