impl Solution {
    pub fn count_vowels(word: String) -> i64 {
        let mut total = 0_i64;
        let length = word.len();
        for (index, character) in word.bytes().enumerate() {
            if matches!(character, b'a' | b'e' | b'i' | b'o' | b'u') {
                total += (index + 1) as i64 * (length - index) as i64;
            }
        }
        total
    }
}
