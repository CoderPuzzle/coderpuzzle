impl Solution {
    pub fn valid_substring_count(word1: String, word2: String) -> i64 {
        // need[c] is how many copies of c a valid window must contain, and
        // missing counts the distinct letters whose quota is not yet met.
        let b1 = word1.as_bytes();
        let mut need = [0_i32; 26];
        for &ch in word2.as_bytes() {
            need[(ch - b'a') as usize] += 1;
        }
        let mut missing = 0;
        for c in 0..26 {
            if need[c] > 0 {
                missing += 1;
            }
        }
        let mut window = [0_i32; 26];
        let mut total: i64 = 0;
        let mut left: usize = 0;
        let n = b1.len();
        for right in 0..n {
            let ci = (b1[right] - b'a') as usize;
            window[ci] += 1;
            if window[ci] == need[ci] {
                missing -= 1;
            }
            if missing == 0 {
                // Shrink while the left character is not load-bearing: its
                // removal leaves every quota intact. When this stops,
                // [left..right] is the minimal covering window ending at
                // right, so starts 0..left all yield valid substrings.
                loop {
                    let li = (b1[left] - b'a') as usize;
                    if window[li] - 1 < need[li] {
                        break;
                    }
                    window[li] -= 1;
                    left += 1;
                }
                total += (left + 1) as i64;
            }
        }
        total
    }
}
