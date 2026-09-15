impl Solution {
    pub fn minimum_keypresses(s: String) -> i32 {
        // Each letter's press count is its position among the sorted
        // frequencies: the most frequent 9 are pressed once, the next 9
        // twice, and the remaining 8 three times.
        let mut freq = [0_i32; 26];
        for ch in s.bytes() {
            freq[(ch - b'a') as usize] += 1;
        }
        freq.sort_unstable_by(|a, b| b.cmp(a));
        let mut presses = 0;
        for (rank, count) in freq.iter().enumerate() {
            presses += count * (rank as i32 / 9 + 1);
        }
        presses
    }
}
