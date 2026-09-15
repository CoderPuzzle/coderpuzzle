impl Solution {
    pub fn unique_letter_string(s: String) -> i32 {
        let s = s.as_bytes();
        // Reorganize the sum per occurrence: a letter adds 1 exactly
        // for substrings in which it appears precisely once. Bucket
        // the indices of each letter.
        let mut positions: Vec<Vec<usize>> = vec![Vec::new(); 26];
        for (i, &c) in s.iter().enumerate() {
            positions[(c - b'A') as usize].push(i);
        }
        let n = s.len();
        let mut total: i64 = 0;
        for list in positions.iter() {
            if list.is_empty() {
                continue;
            }
            // Sentinels -1 and n give the first and last occurrences
            // the same window arithmetic.
            let mut pos: Vec<i64> = Vec::with_capacity(list.len() + 2);
            pos.push(-1);
            for &p in list {
                pos.push(p as i64);
            }
            pos.push(n as i64);
            for k in 1..pos.len() - 1 {
                // i-p left endpoints after the previous equal letter,
                // q-i right endpoints before the next: each
                // (substring, unique char) pair counted exactly once.
                total += (pos[k] - pos[k - 1]) * (pos[k + 1] - pos[k]);
            }
        }
        total as i32
    }
}
