impl Solution {
    pub fn remove_vowels(s: String) -> String {
        s.chars()
            .filter(|&c| !matches!(c, 'a' | 'e' | 'i' | 'o' | 'u'))
            .collect()
    }
}
