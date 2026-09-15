impl Solution {
    pub fn number_of_special_chars(word: String) -> i32 {
        // A letter is special iff both of its cases occur somewhere; mark
        // the two 26-slot case flags in one pass, then count full pairs.
        let mut lower = [false; 26];
        let mut upper = [false; 26];
        for ch in word.bytes() {
            if ch >= b'a' {
                lower[(ch - b'a') as usize] = true;
            } else {
                upper[(ch - b'A') as usize] = true;
            }
        }
        (0..26).filter(|&k| lower[k] && upper[k]).count() as i32
    }
}
