impl Solution {
    pub fn max_palindromes_after_operations(words: Vec<String>) -> i32 {
        let mut count = [0_i32; 26];
        for word in &words {
            for letter in word.as_bytes() {
                count[usize::from(letter - b'a')] += 1;
            }
        }
        let mut pairs = 0_i32;
        for letter in 0..26 {
            pairs += count[letter] / 2;
        }
        let mut halves: Vec<i32> = words.iter().map(|word| (word.len() / 2) as i32).collect();
        halves.sort_unstable();
        let mut made = 0;
        for half in halves {
            if half > pairs {
                break;
            }
            pairs -= half;
            made += 1;
        }
        made
    }
}
