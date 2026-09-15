impl Solution {
    pub fn find_the_longest_substring(s: String) -> i32 {
        let mut bit = [0u8; 26];
        bit[0] = 1; // a
        bit[(b'e' - b'a') as usize] = 2;
        bit[(b'i' - b'a') as usize] = 4;
        bit[(b'o' - b'a') as usize] = 8;
        bit[(b'u' - b'a') as usize] = 16;
        let mut first = [-2i32; 32];
        // empty prefix already has even counts, so a whole-prefix window qualifies
        first[0] = -1;
        let mut mask = 0usize;
        let mut best = 0i32;
        for (i, &b) in s.as_bytes().iter().enumerate() {
            mask ^= bit[(b - b'a') as usize] as usize;
            // equal masks at two indices => all vowel counts even between them;
            // keep only the first occurrence of each mask (earliest maximizes length)
            if first[mask] != -2 {
                if i as i32 - first[mask] > best {
                    best = i as i32 - first[mask];
                }
            } else {
                first[mask] = i as i32;
            }
        }
        best
    }
}
