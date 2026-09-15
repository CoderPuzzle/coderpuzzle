impl Solution {
    pub fn modify_string(s: String) -> String {
        // Only 3 candidate letters and at most 2 neighbors to avoid, so one
        // of 'a', 'b', 'c' (tried in that fixed order) always works.
        let mut chars: Vec<u8> = s.into_bytes();
        let n = chars.len();
        for i in 0..n {
            if chars[i] != b'?' {
                continue;
            }
            for candidate in b'a'..=b'c' {
                let left_ok = i == 0 || chars[i - 1] != candidate;
                let right_ok = i == n - 1 || chars[i + 1] != candidate;
                if left_ok && right_ok {
                    chars[i] = candidate;
                    break;
                }
            }
        }
        String::from_utf8(chars).unwrap()
    }
}
