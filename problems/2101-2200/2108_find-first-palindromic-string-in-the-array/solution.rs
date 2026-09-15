impl Solution {
    pub fn first_palindrome(words: Vec<String>) -> String {
        for word in words {
            let bytes = word.as_bytes();
            let mut left = 0;
            let mut right = bytes.len() - 1;
            while left < right && bytes[left] == bytes[right] {
                left += 1;
                right -= 1;
            }
            if left >= right {
                return word;
            }
        }
        String::new()
    }
}
