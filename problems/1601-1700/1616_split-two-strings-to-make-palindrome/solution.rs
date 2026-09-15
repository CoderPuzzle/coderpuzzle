impl Solution {
    pub fn check_palindrome_formation(a: String, b: String) -> bool {
        let a = a.as_bytes();
        let b = b.as_bytes();
        Self::check(a, b) || Self::check(b, a)
    }

    fn check(x: &[u8], y: &[u8]) -> bool {
        let mut left = 0usize;
        let mut right = x.len() - 1;
        while left < right && x[left] == y[right] {
            left += 1;
            right -= 1;
        }
        if left >= right {
            return true;
        }
        Self::is_palindrome(x, left, right) || Self::is_palindrome(y, left, right)
    }

    fn is_palindrome(s: &[u8], mut left: usize, mut right: usize) -> bool {
        while left < right {
            if s[left] != s[right] {
                return false;
            }
            left += 1;
            right -= 1;
        }
        true
    }
}
