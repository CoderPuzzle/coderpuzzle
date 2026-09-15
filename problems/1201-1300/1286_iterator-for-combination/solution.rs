pub struct CombinationIterator {
    combinations: Vec<String>,
    position: usize,
}

impl CombinationIterator {
    // The design replay dispatches by action name, so methods keep
    // LeetCode's camelCase spelling (as the landed design bundles do).
    pub fn new(characters: String, combinationLength: i32) -> Self {
        // Precompute all combinations via bitmask enumeration. With n <= 15
        // there are at most 2^15 masks; a mask is kept when its popcount
        // equals the combination length. Ascending mask order groups the
        // strings by their highest chosen index rather than by first letter,
        // so an explicit sort restores the lexicographic sequence.
        let chars: Vec<u8> = characters.into_bytes();
        let n = chars.len();
        let mut combinations: Vec<String> = Vec::new();
        for mask in 0usize..(1usize << n) {
            if mask.count_ones() != combinationLength as u32 {
                continue;
            }
            let combo: String = (0..n)
                .filter(|&i| mask >> i & 1 == 1)
                .map(|i| chars[i] as char)
                .collect();
            combinations.push(combo);
        }
        combinations.sort();
        CombinationIterator {
            combinations,
            position: 0,
        }
    }

    pub fn next(&mut self) -> String {
        let combo = self.combinations[self.position].clone();
        self.position += 1;
        combo
    }

    pub fn hasNext(&mut self) -> bool {
        self.position < self.combinations.len()
    }
}
