impl Solution {
    pub fn is_adjacent_diff_at_most_two(s: String) -> bool {
        let bytes = s.as_bytes();
        bytes
            .windows(2)
            .all(|pair| (pair[0] as i32 - pair[1] as i32).abs() <= 2)
    }
}
