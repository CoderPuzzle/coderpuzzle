impl Solution {
    pub fn num_matching_subseq(s: String, words: Vec<String>) -> i32 {
        // Bucket each word by the next character it waits for: stream s
        // once and advance every word waiting on the arriving character.
        // buckets[c] = entries (word index, next index in word) waiting for char c
        let mut waiting: Vec<Vec<(usize, usize)>> = vec![Vec::new(); 26];
        let mut count: i32 = 0;
        for (wi, w) in words.iter().enumerate() {
            let b = w.as_bytes();
            // Empty words match trivially (defensive; constraints say
            // non-empty).
            if b.is_empty() {
                count += 1;
            } else {
                waiting[(b[0] - b'a') as usize].push((wi, 1));
            }
        }
        for &ch in s.as_bytes() {
            let c = (ch - b'a') as usize;
            // Take the bucket so re-filed entries are not reprocessed
            // within this step.
            let its = std::mem::take(&mut waiting[c]);
            // The greedy subsequence check, distributed: a matched word
            // either completes or waits on its next character, and each
            // pointer only moves forward.
            for (wi, i) in its {
                let b = words[wi].as_bytes();
                if i == b.len() {
                    count += 1;
                } else {
                    waiting[(b[i] - b'a') as usize].push((wi, i + 1));
                }
            }
        }
        count
    }
}
