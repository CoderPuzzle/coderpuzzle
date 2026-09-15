impl Solution {
    pub fn count_negatives(grid: Vec<Vec<i32>>) -> i32 {
        // Negatives are a per-row suffix and the boundary only moves left
        // down the columns, so one monotonically sliding pointer counts all.
        let n = grid[0].len() as i32;
        let mut count = 0;
        let mut col = n - 1;
        for row in &grid {
            while col >= 0 && row[col as usize] < 0 {
                col -= 1;
            }
            count += n - 1 - col;
        }
        count
    }
}
