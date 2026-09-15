impl Solution {
    // String offers no in-place index writes, so the scan runs on a char
    // vector — the honest equivalent of the in-place algorithm.
    pub fn reverse_only_letters(s: String) -> String {
        fn is_letter(c: char) -> bool {
            (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')
        }
        let mut chars: Vec<char> = s.chars().collect();
        let mut lo = 0;
        let mut hi = chars.len() - 1;
        while lo < hi {
            // Advance whichever side does not sit on a letter.
            if !is_letter(chars[lo]) {
                lo += 1;
            } else if !is_letter(chars[hi]) {
                hi -= 1;
            } else {
                // Both ends hold a letter: swap them and step both inward.
                chars.swap(lo, hi);
                lo += 1;
                hi -= 1;
            }
        }
        chars.into_iter().collect()
    }
}
