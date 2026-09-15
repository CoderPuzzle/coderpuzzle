impl Solution {
    pub fn max_length_between_equal_characters(s: String) -> i32 {
        // Only a character's first and last occurrence can bound the widest
        // gap for that character, so a single pass recording first-seen
        // indices is enough.
        let mut first = [-1i32; 26];
        let mut best = -1i32;
        for (index, byte) in s.bytes().enumerate() {
            let c = (byte - b'a') as usize;
            if first[c] == -1 {
                first[c] = index as i32;
            } else {
                let gap = index as i32 - first[c] - 1;
                if gap > best {
                    best = gap;
                }
            }
        }
        best
    }
}
