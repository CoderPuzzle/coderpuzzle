impl Solution {
    pub fn total_replacements(ranks: Vec<i32>) -> i32 {
        // One sweep: best is the smallest rank seen so far. A strictly
        // better (lower) arrival displaces it and counts as a replacement;
        // equal or worse ranks leave the selection untouched.
        let mut best = ranks[0];
        let mut replacements = 0;
        for &rank in &ranks[1..] {
            if rank < best {
                best = rank;
                replacements += 1;
            }
        }
        replacements
    }
}
