impl Solution {
    pub fn longest_semi_repetitive_substring(s: String) -> i32 {
        let chars: Vec<char> = s.chars().collect();
        let mut best = 0usize;
        let mut left = 0usize;
        let mut pairs = 0u32;
        for right in 0..chars.len() {
            if right > 0 && chars[right] == chars[right - 1] {
                pairs += 1;
            }
            while pairs > 1 {
                if chars[left] == chars[left + 1] {
                    pairs -= 1;
                }
                left += 1;
            }
            best = best.max(right - left + 1);
        }
        best as i32
    }
}
