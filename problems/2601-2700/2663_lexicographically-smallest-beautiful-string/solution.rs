impl Solution {
    pub fn smallest_beautiful_string(s: String, k: i32) -> String {
        // A string avoids every palindromic substring iff it avoids the short
        // ones: any longer palindrome contains a length-2 or length-3 one at
        // its center (hint 1). So a character is safe exactly when it differs
        // from both of the two characters before it — only those could build
        // a forbidden palindrome ending here.
        let limit = b'a' + k as u8;
        let mut chars = s.into_bytes();
        let n = chars.len();
        let mut pivot: i32 = -1;
        // Walk right to left and bump the first position that accepts a larger
        // safe letter; leaving earlier positions untouched keeps the result
        // minimal, since any smaller answer must agree with s even further.
        for i in (0..n).rev() {
            if pivot != -1 {
                break;
            }
            let original = chars[i];
            for cand in original + 1..limit {
                let safe = (i < 1 || chars[i - 1] != cand) && (i < 2 || chars[i - 2] != cand);
                if safe {
                    chars[i] = cand;
                    pivot = i as i32;
                    break;
                }
            }
        }
        if pivot == -1 {
            return String::new();
        }
        // Rebuild everything after the pivot with the smallest safe letter,
        // which repeats as soon as blocking distance passes ("abcabc...").
        for j in pivot as usize + 1..n {
            for cand in b'a'..limit {
                let safe = (j < 1 || chars[j - 1] != cand) && (j < 2 || chars[j - 2] != cand);
                if safe {
                    chars[j] = cand;
                    break;
                }
            }
        }
        String::from_utf8(chars).unwrap()
    }
}
