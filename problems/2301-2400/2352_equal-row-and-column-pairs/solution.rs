use std::collections::HashMap;

impl Solution {
    pub fn equal_pairs(grid: Vec<Vec<i32>>) -> i32 {
        // A pair (row, col) counts when both read as the identical sequence,
        // so hash each row once and look every column up in that multiset:
        // the count for a column is how many rows carry its exact sequence.
        let n = grid.len();
        let mut row_counts: HashMap<Vec<i32>, i32> = HashMap::new();
        for row in &grid {
            *row_counts.entry(row.clone()).or_insert(0) += 1;
        }
        let mut pairs = 0i32;
        for c in 0..n {
            let column: Vec<i32> = (0..n).map(|r| grid[r][c]).collect();
            pairs += row_counts.get(&column).copied().unwrap_or(0);
        }
        pairs
    }
}
