impl Solution {
    pub fn reverse_words(s: String) -> String {
        // The first word only fixes the target vowel count; each later
        // word matching it is reversed in place, everything else (word
        // order, separators) stays as-is.
        fn count_vowels(word: &str) -> usize {
            word.chars()
                .filter(|c| matches!(c, 'a' | 'e' | 'i' | 'o' | 'u'))
                .count()
        }
        let mut words: Vec<String> = s.split(' ').map(str::to_string).collect();
        let target = count_vowels(&words[0]);
        for word in words.iter_mut().skip(1) {
            if count_vowels(word) == target {
                *word = word.chars().rev().collect();
            }
        }
        words.join(" ")
    }
}
