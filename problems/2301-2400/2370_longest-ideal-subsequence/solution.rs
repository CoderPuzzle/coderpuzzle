impl Solution {
    // best[c] = longest ideal subsequence so far ending with letter c.
    // Each character extends the best chain among letters within +/-k;
    // the window is at most 51 wide, so each step is constant time.
    pub fn longest_ideal_string(s: String, k: i32) -> i32 {
        let mut best = [0i32; 26];
        for ch in s.chars() {
            let c = (ch as u8 - b'a') as i32;
            let lo = (c - k).max(0) as usize;
            let hi = (c + k).min(25) as usize;
            let candidate = best[lo..=hi].iter().copied().max().unwrap_or(0);
            if candidate + 1 > best[c as usize] {
                best[c as usize] = candidate + 1;
            }
        }
        *best.iter().max().unwrap()
    }
}
