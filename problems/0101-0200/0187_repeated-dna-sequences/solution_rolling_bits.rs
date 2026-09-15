impl Solution {
    fn letter_bits(ch: u8) -> u32 {
        // Two bits per letter: A=0, C=1, G=2, T=3.
        match ch {
            b'C' => 1,
            b'G' => 2,
            b'T' => 3,
            _ => 0,
        }
    }

    fn decode(code: u32) -> String {
        let mut letters = [0u8; 10];
        let mut bits = code;
        for slot in letters.iter_mut().rev() {
            *slot = b"ACGT"[(bits & 3) as usize];
            bits >>= 2;
        }
        String::from_utf8(letters.to_vec()).unwrap()
    }

    pub fn find_repeated_dna_sequences(s: String) -> Vec<String> {
        let mut seen: std::collections::HashSet<u32> = std::collections::HashSet::new();
        // A second set collects each repeated window exactly once, even when
        // it occurs three or more times.
        let mut repeated: std::collections::HashSet<u32> = std::collections::HashSet::new();
        // 20-bit register: ten letters times two bits each. The oldest
        // letter slides out as the new one slides in.
        let mut code = 0u32;
        for (i, &ch) in s.as_bytes().iter().enumerate() {
            code = (code << 2 | Self::letter_bits(ch)) & 0xFFFFF;
            // Fewer than ten letters seen: no full window yet.
            if i >= 9 {
                // insert() returns false when the window was already seen,
                // i.e. it occurs at least twice.
                if !seen.insert(code) {
                    repeated.insert(code);
                }
            }
        }
        // Decode the surviving codes back into letters; sorted output for a
        // deterministic order.
        let mut result: Vec<String> = repeated.into_iter().map(Self::decode).collect();
        result.sort();
        result
    }
}
