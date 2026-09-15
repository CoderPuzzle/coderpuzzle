impl Solution {
    pub fn add_minimum(word: String) -> i32 {
        // Two pointers over word and the repeating pattern "abc": every
        // aligned pattern slot the word fails to consume is a letter that
        // must be inserted there.
        let word = word.as_bytes();
        let pattern = b"abc";
        let mut answer = 0usize;
        let mut k = 0usize;
        let mut i = 0usize;
        while k < word.len() {
            if word[k] == pattern[i % 3] {
                k += 1;
            } else {
                answer += 1;
            }
            i += 1;
        }
        // After the last consumed letter, finish off its cycle.
        (answer + (3 - i % 3) % 3) as i32
    }
}
