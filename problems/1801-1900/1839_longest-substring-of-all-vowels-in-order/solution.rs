impl Solution {
    // One pass over vowel runs. A beautiful substring is a maximal run of
    // non-decreasing vowels containing all five; extend the run while the
    // next vowel is >= the current one, then score it.
    pub fn longest_beautiful_substring(word: String) -> i32 {
        const ORDER: [char; 5] = ['a', 'e', 'i', 'o', 'u'];
        let bytes = word.as_bytes();
        let n = bytes.len();
        let mut best = 0;
        let mut i = 0;
        while i < n {
            if bytes[i] != b'a' {
                i += 1;
                continue;
            }
            let mut seen = 1u8; // bit 0 set: 'a' present
            let mut j = i + 1;
            while j < n && bytes[j] >= bytes[j - 1] {
                let rank = ORDER.iter().position(|&c| c as u8 == bytes[j]).unwrap();
                seen |= 1 << rank;
                j += 1;
            }
            if seen == 0b11111 && j - i > best {
                best = j - i;
            }
            i = if j > i { j } else { i + 1 };
        }
        best as i32
    }
}
