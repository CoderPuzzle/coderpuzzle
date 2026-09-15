impl Solution {
    // Each character contributes its reversed-alphabet value (26 - letter
    // rank) times its 1-indexed string position; sum over the whole string.
    pub fn reverse_degree(s: String) -> i32 {
        s.bytes()
            .enumerate()
            .map(|(i, b)| (26 - (b - b'a') as i32) * (i as i32 + 1))
            .sum()
    }
}
