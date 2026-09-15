impl Solution {
    // String offers no in-place index writes, so the scan runs on a char
    // vector — the honest equivalent of the in-place algorithm.
    pub fn reverse_vowels(s: String) -> String {
        let is_vowel = |c: char| matches!(c, 'a' | 'e' | 'i' | 'o' | 'u' | 'A' | 'E' | 'I' | 'O' | 'U');
        let mut chars: Vec<char> = s.chars().collect();
        let mut lo = 0;
        let mut hi = chars.len() - 1;
        while lo < hi {
            // Advance whichever side does not sit on a vowel.
            if !is_vowel(chars[lo]) {
                lo += 1;
            } else if !is_vowel(chars[hi]) {
                hi -= 1;
            } else {
                // Both ends hold a vowel: swap them and step both inward.
                chars.swap(lo, hi);
                lo += 1;
                hi -= 1;
            }
        }
        chars.into_iter().collect()
    }
}
