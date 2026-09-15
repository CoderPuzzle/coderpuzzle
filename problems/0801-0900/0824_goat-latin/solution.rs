impl Solution {
    // One pass over the words. Each word is reshaped by its first letter
    // alone: a vowel-initial word survives intact, a consonant-initial
    // word rotates its first letter to the end. Every word then takes
    // "ma" plus one more 'a' per its 1-based index, so the i-th word
    // ends in exactly i 'a's. The vowel test is case-blind: 'I' opens
    // the first example as a vowel.
    pub fn to_goat_latin(sentence: String) -> String {
        let is_vowel = |c: u8| matches!(c, b'a' | b'e' | b'i' | b'o' | b'u' | b'A' | b'E' | b'I' | b'O' | b'U');
        let mut parts: Vec<String> = Vec::new();
        for (index, word) in sentence.split(' ').enumerate() {
            let (stem, moved) = if is_vowel(word.as_bytes()[0]) {
                (word, "")
            } else {
                (&word[1..], &word[..1])
            };
            parts.push(format!("{}{}ma{}", stem, moved, "a".repeat(index + 1)));
        }
        parts.join(" ")
    }
}
