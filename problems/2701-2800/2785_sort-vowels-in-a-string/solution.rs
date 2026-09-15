// Consonants never move; only vowel values permute among the vowel
// slots. Collect the vowels, sort them by ASCII (every uppercase
// vowel sorts before every lowercase one, e.g. 'O' < 'e'), and pour
// them back into the vowel slots left to right.
impl Solution {
    pub fn sort_vowels(s: String) -> String {
        let mut vowels: Vec<u8> = s.bytes().filter(|c| b"aeiouAEIOU".contains(c)).collect();
        vowels.sort_unstable();
        let mut result = s.into_bytes();
        let mut i = 0;
        for c in result.iter_mut() {
            if b"aeiouAEIOU".contains(c) {
                *c = vowels[i];
                i += 1;
            }
        }
        String::from_utf8(result).unwrap()
    }
}
