impl Solution {
    pub fn kth_character(k: i32) -> String {
        // Simulate the operation directly: each pass appends a copy of the
        // current word with every letter advanced to its next character
        // (wrapping z back to a), so the length doubles. Nine passes already
        // exceed k = 500 since 2^9 = 512, and characters never change once
        // written, so when the word first reaches length k the character at
        // index k - 1 is the answer.
        let mut word: Vec<u8> = vec![b'a'];
        while (word.len() as i32) < k {
            let n = word.len();
            for i in 0..n {
                word.push(b'a' + (word[i] - b'a' + 1) % 26);
            }
        }
        (word[(k - 1) as usize] as char).to_string()
    }
}
