impl Solution {
    // Sieve from the smallest element index: the first occurrence of each
    // value claims every multiple it divides, so each group size reads off
    // the earliest qualifying element index.
    pub fn assign_elements(groups: Vec<i32>, elements: Vec<i32>) -> Vec<i32> {
        const LIMIT: usize = 100_001;
        let mut best = vec![-1i32; LIMIT];
        let mut seen = vec![false; LIMIT];
        for (index, &value) in elements.iter().enumerate() {
            let value = value as usize;
            if seen[value] {
                continue;
            }
            seen[value] = true;
            let mut multiple = value;
            while multiple < LIMIT {
                if best[multiple] == -1 {
                    best[multiple] = index as i32;
                }
                multiple += value;
            }
        }
        groups.iter().map(|&size| best[size as usize]).collect()
    }
}
