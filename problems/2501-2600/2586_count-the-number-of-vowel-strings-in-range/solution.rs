impl Solution {
    pub fn vowel_strings(words: Vec<String>, left: i32, right: i32) -> i32 {
        // A word counts exactly when both endpoints are vowels; a byte
        // classifier keeps each endpoint check constant time.
        let is_vowel = |c: u8| matches!(c, b'a' | b'e' | b'i' | b'o' | b'u');
        let mut count = 0;
        for i in left..=right {
            let word = &words[i as usize];
            if is_vowel(word.as_bytes()[0]) && is_vowel(*word.as_bytes().last().unwrap()) {
                count += 1;
            }
        }
        count
    }
}
