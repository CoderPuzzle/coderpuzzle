impl Solution {
    pub fn can_construct(s: String, k: i32) -> bool {
        // Splitting all of s across k palindromes needs one character per
        // string at minimum, and every letter with an odd count must anchor
        // the center of a different palindrome. Both bounds are achievable
        // simultaneously, so checking them is enough.
        if (s.len() as i32) < k {
            return false;
        }
        let mut counts = [0i32; 26];
        for byte in s.bytes() {
            counts[(byte - b'a') as usize] += 1;
        }
        let odd: i32 = counts.iter().map(|count| count % 2).sum();
        odd <= k
    }
}
