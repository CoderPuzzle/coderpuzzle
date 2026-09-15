impl Solution {
    pub fn length_of_last_word(s: String) -> i32 {
        // Walk in from the right: trailing spaces belong to no word, so skip
        // them, then count letters until a space or the start of the string.
        let s = s.as_bytes();
        let mut i = s.len() as isize - 1;
        while i >= 0 && s[i as usize] == b' ' {
            i -= 1;
        }
        let end = i;
        while i >= 0 && s[i as usize] != b' ' {
            i -= 1;
        }
        (end - i) as i32
    }
}
