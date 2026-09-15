use std::collections::HashMap;

impl Solution {
    // Scan the rows top to bottom. Every pair of 1-columns in the current row
    // completes one rectangle with each earlier row that already showed the
    // same column pair, so a counter on column pairs charges exactly one unit
    // of work per rectangle.
    pub fn count_corner_rectangles(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid[0].len() as i64;
        let mut pair_rows: HashMap<i64, i32> = HashMap::new();
        let mut total: i64 = 0;
        for row in &grid {
            let ones: Vec<usize> = (0..row.len()).filter(|&c| row[c] == 1).collect();
            for i in 0..ones.len() {
                let base = ones[i] as i64 * n;
                for &second in &ones[i + 1..] {
                    let key = base + second as i64;
                    let earlier = *pair_rows.get(&key).unwrap_or(&0);
                    total += earlier as i64;
                    *pair_rows.entry(key).or_insert(0) += 1;
                }
            }
        }
        total as i32
    }
}
