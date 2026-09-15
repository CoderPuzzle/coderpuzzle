use std::collections::HashMap;

// One index list per word, built once at construction; shortest walks the
// two sorted index lists in lockstep, always advancing the smaller index —
// every pair that can still improve the gap gets examined, so one merge
// finds the closest pair.
pub struct WordDistance {
    positions: HashMap<String, Vec<i32>>,
}

impl WordDistance {
    pub fn new(wordsDict: Vec<String>) -> Self {
        // Appending left to right keeps each list ascending — the walk
        // relies on both lists being sorted.
        let mut positions: HashMap<String, Vec<i32>> = HashMap::new();
        for (index, word) in wordsDict.into_iter().enumerate() {
            positions.entry(word).or_default().push(index as i32);
        }
        WordDistance { positions }
    }

    pub fn shortest(&mut self, word1: String, word2: String) -> i32 {
        let first = self.positions.get(word1.as_str()).unwrap();
        let second = self.positions.get(word2.as_str()).unwrap();
        let mut best = (first[0] - second[0]).abs();
        let mut i = 0;
        let mut j = 0;
        while i < first.len() && j < second.len() {
            // Advancing the larger index can only widen the gap, so the
            // smaller one takes the step.
            best = best.min((first[i] - second[j]).abs());
            if first[i] < second[j] {
                i += 1;
            } else {
                j += 1;
            }
        }
        best
    }
}
