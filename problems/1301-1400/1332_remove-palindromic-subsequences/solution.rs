impl Solution {
    pub fn remove_palindrome_sub(s: String) -> i32 {
        // One letter's positions form a palindrome by themselves, so two
        // steps always suffice; a single step works iff s is a palindrome.
        let bytes = s.as_bytes();
        let mut left = 0;
        let mut right = bytes.len() as i64 - 1;
        while left < right {
            if bytes[left as usize] != bytes[right as usize] {
                return 2;
            }
            left += 1;
            right -= 1;
        }
        1
    }
}
