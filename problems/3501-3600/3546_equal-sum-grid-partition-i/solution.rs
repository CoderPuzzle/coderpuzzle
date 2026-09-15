impl Solution {
    pub fn can_partition_grid(grid: Vec<Vec<i32>>) -> bool {
        // One cut splits the grid into a run of whole rows or whole
        // columns, so scan run-prefix sums for total / 2. Totals reach
        // 1e5 cells x 1e5 = 1e10 — sums must be i64, not i32.
        let total: i64 = grid.iter().map(|row| row.iter().map(|v| *v as i64).sum::<i64>()).sum();
        if total % 2 != 0 {
            return false;
        }
        let half = total / 2;
        let mut prefix = 0i64;
        for row in &grid[..grid.len() - 1] {
            prefix += row.iter().map(|v| *v as i64).sum::<i64>();
            if prefix == half {
                return true;
            }
        }
        prefix = 0;
        for c in 0..grid[0].len() - 1 {
            for row in &grid {
                prefix += row[c] as i64;
            }
            if prefix == half {
                return true;
            }
        }
        false
    }
}
