impl Solution {
    pub fn is_valid(word: String) -> bool {
        // One scan: reject any character outside digits/letters while
        // tracking whether a vowel and a consonant were both seen.
        if word.len() < 3 {
            return false;
        }
        let mut has_vowel = false;
        let mut has_consonant = false;
        for &ch in word.as_bytes() {
            let low = ch | 0x20;
            match ch {
                b'a'..=b'z' | b'A'..=b'Z' => {
                    if b"aeiou".contains(&low) {
                        has_vowel = true;
                    } else {
                        has_consonant = true;
                    }
                }
                b'0'..=b'9' => continue,
                _ => return false,
            }
        }
        has_vowel && has_consonant
    }
}
