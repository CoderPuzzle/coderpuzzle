impl Solution {
    pub fn make_palindrome(s: String) -> bool {
        let bytes = s.as_bytes();
        let n = bytes.len();
        (0..n / 2).filter(|&i| bytes[i] != bytes[n - 1 - i]).count() <= 2
    }
}
