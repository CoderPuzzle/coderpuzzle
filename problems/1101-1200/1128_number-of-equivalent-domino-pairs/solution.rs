impl Solution {
    pub fn num_equiv_domino_pairs(dominoes: Vec<Vec<i32>>) -> i32 {
        // Canonical orientation (min, max) collapses a domino and its
        // rotation to one cell of a 9x9 table.
        let mut table = [[0i64; 10]; 10];
        let mut pairs = 0i64;
        for domino in &dominoes {
            let (lo, hi) = if domino[0] <= domino[1] {
                (domino[0], domino[1])
            } else {
                (domino[1], domino[0])
            };
            // Every earlier domino in this cell pairs with the current one.
            pairs += table[lo as usize][hi as usize];
            table[lo as usize][hi as usize] += 1;
        }
        pairs as i32
    }
}
