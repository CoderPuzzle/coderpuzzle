impl Solution {
    pub fn max_product(words: Vec<String>) -> i32 {
        // Only the set of distinct letters matters: compress each word into
        // a 26-bit mask (bit set per letter present) plus its length.
        let n = words.len();
        let mut masks = vec![0u32; n];
        let mut lens = vec![0i32; n];
        for i in 0..n {
            let mut mask = 0u32;
            for b in words[i].bytes() {
                mask |= 1u32 << (b - b'a');
            }
            masks[i] = mask;
            lens[i] = words[i].len() as i32;
        }
        let mut best = 0i32;
        for i in 0..n {
            for j in (i + 1)..n {
                // Masks AND to zero exactly when the words share no letter.
                if masks[i] & masks[j] == 0 && lens[i] * lens[j] > best {
                    best = lens[i] * lens[j];
                }
            }
        }
        best
    }
}
