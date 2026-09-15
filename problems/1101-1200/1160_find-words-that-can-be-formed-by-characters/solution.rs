impl Solution {
    pub fn count_characters(words: Vec<String>, chars: String) -> i32 {
        let mut have = [0i32; 26];
        for b in chars.bytes() {
            have[(b - b'a') as usize] += 1;
        }
        let mut total = 0i32;
        for word in &words {
            let mut need = [0i32; 26];
            for b in word.bytes() {
                need[(b - b'a') as usize] += 1;
            }
            // Formable iff every letter requirement fits the budget; the
            // budget is per word, so `have` is never consumed.
            if need.iter().zip(have.iter()).all(|(&n, &h)| n <= h) {
                total += word.len() as i32;
            }
        }
        total
    }
}
