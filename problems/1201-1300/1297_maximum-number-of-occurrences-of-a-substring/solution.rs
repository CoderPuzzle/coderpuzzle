use std::collections::HashMap;

impl Solution {
    pub fn max_freq(s: String, max_letters: i32, min_size: i32, max_size: i32) -> i32 {
        // A length-L qualifying substring (L > minSize) has a minSize prefix
        // occurring at least as often, so only exact-minSize windows count.
        let bytes = s.as_bytes();
        let window_len = min_size as usize;
        let mut counts: HashMap<&[u8], i32> = HashMap::new();
        let mut best = 0;
        for start in 0..=(bytes.len().saturating_sub(window_len)) {
            let window = &bytes[start..start + window_len];
            let mut seen = [false; 26];
            let mut distinct = 0;
            for &b in window {
                if !seen[(b - b'a') as usize] {
                    seen[(b - b'a') as usize] = true;
                    distinct += 1;
                }
            }
            if distinct as i32 <= max_letters {
                let next = counts.entry(window).or_insert(0);
                *next += 1;
                if *next > best {
                    best = *next;
                }
            }
        }
        let _ = max_size; // only min_size windows can ever win
        best
    }
}
