impl Solution {
    pub fn can_be_valid(s: String, locked: String) -> bool {
        if s.len() % 2 == 1 {
            return false;
        }
        let mut minimum = 0_i32;
        let mut maximum = 0_i32;
        for (character, is_locked) in s.bytes().zip(locked.bytes()) {
            if is_locked == b'0' {
                minimum -= 1;
                maximum += 1;
            } else if character == b'(' {
                minimum += 1;
                maximum += 1;
            } else {
                minimum -= 1;
                maximum -= 1;
            }
            if maximum < 0 {
                return false;
            }
            minimum = minimum.max(0);
        }
        minimum == 0
    }
}
