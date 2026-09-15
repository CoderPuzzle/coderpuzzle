impl Solution {
    // The magazine is a budget: tally its letters, one slot per letter of
    // the alphabet, then spend the note against that budget.
    pub fn can_construct(ransom_note: String, magazine: String) -> bool {
        let mut counts = [0i32; 26];
        for b in magazine.bytes() {
            counts[(b - b'a') as usize] += 1;
        }
        // A slot dipping below zero means the magazine cannot supply that
        // letter often enough — each of its letters is usable only once.
        for b in ransom_note.bytes() {
            let slot = (b - b'a') as usize;
            counts[slot] -= 1;
            if counts[slot] < 0 {
                return false;
            }
        }
        true
    }
}
