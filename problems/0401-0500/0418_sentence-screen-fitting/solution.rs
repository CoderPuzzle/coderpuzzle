impl Solution {
    pub fn words_typing(sentence: Vec<String>, rows: i32, cols: i32) -> i32 {
        let n = sentence.len();
        let lengths: Vec<usize> = sentence.iter().map(|word| word.len()).collect();
        // One sentence "packet": every word plus its trailing space.
        let packet: usize = lengths.iter().sum::<usize>() + n;
        let (rows, cols) = (rows as usize, cols as usize);
        let mut next_start = vec![-1i32; n];
        let mut row_words = vec![0i64; n];
        let mut total: i64 = 0;
        let mut start = 0usize;
        for _ in 0..rows {
            if next_start[start] < 0 {
                // A row's fill depends only on the word it starts from, so
                // memoize (next start, words placed) per start index.
                let mut used = 0usize;
                let mut placed = 0usize;
                let mut j = start;
                // Finish the in-progress sentence pass, reaching word 0.
                while j < n && used + lengths[j] <= cols {
                    used += lengths[j] + 1;
                    placed += 1;
                    j += 1;
                }
                if j == n {
                    j = 0;
                    if used <= cols {
                        // Aligned at word 0: whole packets fit wholesale,
                        // (cols - used) / packet of them, in one step.
                        let full = (cols - used) / packet;
                        placed += full * n;
                        used += full * packet;
                    }
                    // A sub-packet remainder: fewer than `packet` columns
                    // left, so at most n more words, one by one.
                    while j < n && used + lengths[j] <= cols {
                        used += lengths[j] + 1;
                        placed += 1;
                        j += 1;
                    }
                    if j == n {
                        j = 0;
                    }
                }
                next_start[start] = j as i32;
                row_words[start] = placed as i64;
            }
            total += row_words[start];
            start = next_start[start] as usize;
        }
        // Every n consecutive words placed completes the sentence once.
        (total / n as i64) as i32
    }
}
