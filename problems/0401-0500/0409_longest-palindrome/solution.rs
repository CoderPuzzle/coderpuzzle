impl Solution {
    // A palindrome's wings mirror, so every letter it uses must pair with
    // a same-letter partner on the other side — one slot per letter,
    // lowercase and uppercase separate because case matters.
    pub fn longest_palindrome(s: String) -> i32 {
        let mut counts = [0i32; 52];
        for b in s.bytes() {
            if b <= b'Z' {
                counts[(b - b'A') as usize] += 1;
            } else {
                counts[(26 + b - b'a') as usize] += 1;
            }
        }
        // Pairs contribute one letter to each wing; at most one unpaired
        // letter can occupy the center, so add 1 exactly when some count
        // is odd and leave every other leftover unused.
        let mut pairs = 0;
        let mut odd = 0;
        for &count in counts.iter() {
            pairs += count / 2;
            if count % 2 == 1 {
                odd = 1;
            }
        }
        pairs * 2 + odd
    }
}
