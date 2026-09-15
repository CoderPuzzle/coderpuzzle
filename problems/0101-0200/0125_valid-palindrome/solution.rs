impl Solution {
    pub fn is_palindrome(s: String) -> bool {
        // Two pointers walk inward from both ends. Each skips the characters
        // the rules erase, so one lowercase comparison per surviving pair
        // decides the answer and no filtered copy of s is ever built.
        let chars: Vec<char> = s.chars().collect();
        // usize cannot go one below an empty string, so answer the shortest
        // inputs directly; every longer input enters the loop below.
        if chars.len() < 2 {
            return true;
        }
        let mut left = 0;
        let mut right = chars.len() - 1;
        while left < right {
            // Punctuation and spaces are removed by the normalization, so they
            // can never break the mirror: step past them.
            while left < right && !chars[left].is_ascii_alphanumeric() {
                left += 1;
            }
            while left < right && !chars[right].is_ascii_alphanumeric() {
                right -= 1;
            }
            // Comparing lowercased characters applies the case rule in place;
            // digits lower to themselves, so one path covers both kinds.
            if chars[left].to_ascii_lowercase() != chars[right].to_ascii_lowercase() {
                return false;
            }
            left += 1;
            right -= 1;
        }
        true
    }
}
