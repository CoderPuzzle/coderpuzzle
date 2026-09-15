use std::collections::HashMap;

impl Solution {
    pub fn find_num_of_valid_words(words: Vec<String>, puzzles: Vec<String>) -> Vec<i32> {
        let mut counts: HashMap<u32, i32> = HashMap::new();
        // bucket words by their distinct-letter mask (repeats are irrelevant)
        // so each puzzle avoids scanning all words
        for w in &words {
            let mut m: u32 = 0;
            for ch in w.bytes() {
                m |= 1u32 << (ch - b'a');
            }
            *counts.entry(m).or_insert(0) += 1;
        }

        let mut answer = Vec::with_capacity(puzzles.len());
        for puzzle in &puzzles {
            let pb = puzzle.as_bytes();
            // a valid word mask must contain the puzzle's first letter
            let first: u32 = 1u32 << (pb[0] - b'a');
            let mut puzzle_mask: u32 = 0;
            for &ch in pb {
                puzzle_mask |= 1u32 << (ch - b'a');
            }
            let mut total: i32 = 0;
            // enumerate every submask of the 7-letter puzzle mask (at most
            // 127); sub = (sub - 1) & puzzle_mask walks them all in order
            let mut sub = puzzle_mask;
            while sub != 0 {
                if sub & first != 0 {
                    total += counts.get(&sub).copied().unwrap_or(0);
                }
                sub = (sub - 1) & puzzle_mask;
            }
            answer.push(total);
        }
        answer
    }
}
