impl Solution {
    pub fn count_of_substrings(word: String, k: i32) -> i32 {
        // For each start, grow the window rightward maintaining a 5-bit
        // vowel mask and a running consonant total; count every end where
        // all five vowels are present and exactly k consonants are inside.
        let b = word.as_bytes();
        let n = b.len();
        let mut total = 0_i32;
        for start in 0..n {
            let mut seen = 0_i32;
            let mut consonants = 0_i32;
            for end in start..n {
                match b[end] {
                    b'a' => seen |= 1 << 0,
                    b'e' => seen |= 1 << 1,
                    b'i' => seen |= 1 << 2,
                    b'o' => seen |= 1 << 3,
                    b'u' => seen |= 1 << 4,
                    _ => consonants += 1,
                }
                if seen == 31 && consonants == k {
                    total += 1;
                }
            }
        }
        total
    }
}
