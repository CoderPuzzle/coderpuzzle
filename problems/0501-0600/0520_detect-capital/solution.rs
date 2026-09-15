impl Solution {
    // The three legal usages differ only in how many capitals the word
    // holds and where they sit, so one sweep that counts capitals in the
    // ASCII upper range captures everything there is to check.
    pub fn detect_capital_use(word: String) -> bool {
        let mut capitals = 0usize;
        for &b in word.as_bytes() {
            if b'A' <= b && b <= b'Z' {
                capitals += 1;
            }
        }
        // No capitals is the all-lowercase word, every character a capital
        // is the all-caps word, and a lone capital is legal only when it
        // leads the word.
        let first = word.as_bytes()[0];
        capitals == 0 || capitals == word.len() || (capitals == 1 && b'A' <= first && first <= b'Z')
    }
}
