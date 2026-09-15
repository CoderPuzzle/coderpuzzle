use std::collections::HashSet;

// Morse code of 'a'..'z' in alphabetical order; a letter's entry sits at
// byte - b'a'.
const MORSE: [&str; 26] = [
    ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.",
    "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..",
];

impl Solution {
    pub fn unique_morse_representations(words: Vec<String>) -> i32 {
        // A word's transformation is its letters' codes joined in order; the
        // set counts distinct results, so equal transformations fold.
        let mut seen: HashSet<String> = HashSet::new();
        for word in &words {
            let mut transformation = String::new();
            for &byte in word.as_bytes() {
                transformation.push_str(MORSE[(byte - b'a') as usize]);
            }
            seen.insert(transformation);
        }
        seen.len() as i32
    }
}
