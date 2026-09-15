impl Solution {
    pub fn max_score(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut zeros_left = 0;
        let mut ones_right = bytes.iter().filter(|&&c| c == b'1').count() as i32;
        let mut best = -1;
        for i in 0..bytes.len() - 1 {
            if bytes[i] == b'0' {
                zeros_left += 1;
            } else {
                ones_right -= 1;
            }
            let score = zeros_left + ones_right;
            if score > best {
                best = score;
            }
        }
        best
    }
}
