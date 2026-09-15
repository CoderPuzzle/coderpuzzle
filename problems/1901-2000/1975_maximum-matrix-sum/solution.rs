impl Solution {
    pub fn max_matrix_sum(matrix: Vec<Vec<i32>>) -> i64 {
        // Each operation flips two border-adjacent cells, so the parity of
        // the negative count is invariant: an even count makes every value
        // positive, an odd count must leave the smallest-magnitude value
        // negative. Accumulate in i64: 250^2 * 1e5 = 6.25e9 > 2^31.
        let mut total: i64 = 0;
        let mut negatives = 0;
        let mut smallest = 100_000i32;
        for row in &matrix {
            for &value in row {
                let magnitude = value.abs();
                total += magnitude as i64;
                if value < 0 {
                    negatives += 1;
                }
                smallest = smallest.min(magnitude);
            }
        }
        if negatives % 2 == 1 {
            total -= 2 * smallest as i64;
        }
        total
    }
}
