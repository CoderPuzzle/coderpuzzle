impl Solution {
    pub fn minimize_concatenated_length(words: Vec<String>) -> i32 {
        // dp[first][last] = shortest length of a concatenation of the words
        // processed so far starting with `first` and ending with `last`.
        const INF: i32 = i32::MAX;
        let mut dp = vec![[INF; 26]; 26];
        let first_bytes = words[0].as_bytes();
        let first_index = usize::from(first_bytes[0] - b'a');
        let last_index = usize::from(first_bytes[first_bytes.len() - 1] - b'a');
        dp[first_index][last_index] = words[0].len() as i32;
        for word in &words[1..] {
            let bytes = word.as_bytes();
            let word_first = usize::from(bytes[0] - b'a');
            let word_last = usize::from(bytes[bytes.len() - 1] - b'a');
            let length = word.len() as i32;
            let mut ndp = vec![[INF; 26]; 26];
            for f in 0..26 {
                for l in 0..26 {
                    let current = dp[f][l];
                    if current == INF {
                        continue;
                    }
                    // Append on the right: seam merges when our last char
                    // equals the word's first char.
                    let mut appended = current + length;
                    if l == word_first {
                        appended -= 1;
                    }
                    if appended < ndp[f][word_last] {
                        ndp[f][word_last] = appended;
                    }
                    // Prepend on the left: seam merges when the word's last
                    // char equals our first char.
                    let mut prepended = current + length;
                    if word_last == f {
                        prepended -= 1;
                    }
                    if prepended < ndp[word_first][l] {
                        ndp[word_first][l] = prepended;
                    }
                }
            }
            dp = ndp;
        }
        *dp.iter().flatten().min().unwrap()
    }
}
