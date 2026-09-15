impl Solution {
    pub fn count_vowel_substrings(word: String) -> i32 {
        let word = word.as_bytes();
        let mut total = 0;
        for start in 0..word.len() {
            let mut mask = 0;
            for &character in &word[start..] {
                let bit = match character {
                    b'a' => 1,
                    b'e' => 2,
                    b'i' => 4,
                    b'o' => 8,
                    b'u' => 16,
                    _ => 0,
                };
                if bit == 0 {
                    break;
                }
                mask |= bit;
                if mask == 31 {
                    total += 1;
                }
            }
        }
        total
    }
}
