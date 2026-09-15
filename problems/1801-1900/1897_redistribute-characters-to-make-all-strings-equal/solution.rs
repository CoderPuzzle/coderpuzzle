impl Solution {
    // Pool all letters; n equal strings need each count % n == 0.
    pub fn make_equal(words: Vec<String>) -> bool {
        let n = words.len() as i32;
        let mut counts = [0i32; 26];
        for w in &words {
            for b in w.bytes() {
                counts[(b - b'a') as usize] += 1;
            }
        }
        counts.iter().all(|&c| c % n == 0)
    }
}
