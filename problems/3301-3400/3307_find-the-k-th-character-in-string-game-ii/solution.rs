impl Solution {
    pub fn kth_character(k: i64, operations: Vec<i32>) -> String {
        // The final word can span 2^100 characters, so it is never built.
        // Replay backwards from k: operation i (which doubles the length
        // from 2^i to 2^(i+1)) only touches the position when k sits in its
        // appended half (k > 2^i), in which case the character is a copy of
        // the one at k - 2^i -- shifted once more if the type is 1. Every
        // qualifying type-1 operation advances the letter cyclically by one
        // past 'z', and starting from "a" the answer is that accumulated
        // shift mod 26. Only indices below k's bit width can qualify, so
        // the walk starts there -- in debug builds shifting by >= 64 would
        // panic and in release builds it wraps the shift amount.
        let mut rest = k - 1;
        let mut top: u32 = 0;
        let mut any = false;
        while rest > 0 {
            rest >>= 1;
            top += 1;
            any = true;
        }
        let last = operations.len() - 1;
        let last = if any { (top - 1).min(last as u32) as usize } else { 0 };
        let mut position = k;
        let mut shifts = 0_i32;
        for index in (0..=last).rev() {
            let half = 1_i64 << index;
            if position > half {
                position -= half;
                if operations[index] == 1 {
                    shifts += 1;
                }
            }
        }
        char::from(b'a' + (shifts % 26) as u8).to_string()
    }
}
