impl Solution {
    pub fn lex_greater_permutation(s: String, target: String) -> String {
        // Counts of the letters still unused while the built prefix keeps
        // matching target position by position. Inputs are lowercase ASCII,
        // so bytes are exactly the characters.
        let mut freq = [0i32; 26];
        for ch in s.bytes() {
            freq[(ch - b'a') as usize] += 1;
        }
        // The most recent position where a letter strictly greater than
        // target[i] was still available: that bump point plus the count
        // snapshot taken there is the best fallback completion.
        let mut bump_at: i32 = -1;
        let mut bump_ch = 0u8;
        let mut bump_freq = [0i32; 26];
        let tb = target.as_bytes();
        for i in 0..tb.len() {
            let ci = (tb[i] - b'a') as usize;
            for d in ci + 1..26 {
                if freq[d] > 0 {
                    bump_at = i as i32;
                    bump_ch = b'a' + d as u8;
                    bump_freq = freq;
                    break;
                }
            }
            if freq[ci] == 0 {
                break;
            }
            freq[ci] -= 1;
        }
        if bump_at < 0 {
            return String::new();
        }
        // Matched prefix, then the bump letter, then everything left in
        // ascending order — the smallest tail this multiset allows.
        let mut result = String::with_capacity(tb.len());
        result.push_str(&target[..bump_at as usize]);
        result.push(bump_ch as char);
        bump_freq[(bump_ch - b'a') as usize] -= 1;
        for d in 0..26 {
            for _ in 0..bump_freq[d] {
                result.push((b'a' + d as u8) as char);
            }
        }
        result
    }
}
