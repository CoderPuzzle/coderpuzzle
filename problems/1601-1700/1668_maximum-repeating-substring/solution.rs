impl Solution {
    // word is k-repeating exactly when some window of sequence is tiled
    // by k back-to-back copies of word — no overlap, no gap. Scan start
    // positions right to left: run[i] is the number of copies in the
    // longest tiling beginning at i, so a match at i gives
    // run[i] = run[i + m] + 1; the answer is the maximum run. A
    // self-overlapping word such as "aa" cannot chain through the
    // overlap, and scattered matches never tile into one block.
    pub fn max_repeating(sequence: String, word: String) -> i32 {
        let (seq, pat) = (sequence.as_bytes(), word.as_bytes());
        let (n, m) = (seq.len(), pat.len());
        let mut run = vec![0; n + 1];
        let mut best = 0;
        for i in (0..n).rev() {
            if i + m <= n && &seq[i..i + m] == pat {
                run[i] = run[i + m] + 1;
                if run[i] > best {
                    best = run[i];
                }
            }
        }
        best
    }
}
